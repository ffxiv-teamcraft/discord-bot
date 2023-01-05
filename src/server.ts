import Discord, {Message, MessageEmbed, TextChannel} from "discord.js";
import {BotConfig, config} from "./config/config";
import {CommandHandler} from "./command_handler";
import {CommissionSub} from "./pub-sub/commission-sub";
import fetch from "node-fetch";
import {PubSub} from "@google-cloud/pubsub";
import {CacheService} from "./core/cache-service";
import {twitStream} from "./twitter/twitter";

validateConfig(config);

const commandHandler = new CommandHandler(config.prefix);

const client = new Discord.Client();

//https://discordapp.com/api/oauth2/authorize?client_id=782224077632962571&permissions=2112&scope=bot

client.on("ready", () => {
    console.log("Bot has started");
});

client.on("message", (message: Message) => {
    commandHandler.handleMessage(message);
});

client.on("error", e => {
    console.error("Discord client error!", e);
});

client.login(config.token);

const pubsub = new PubSub({projectId: 'ffxivteamcraft'});
const commissionsCreatedTopic = pubsub.topic('commissions-created').subscription('bot');
const patreonPledgesTopic = pubsub.topic('patreon-pledges').subscription('patreon-pledges-sub');

fetch('https://raw.githubusercontent.com/ffxiv-teamcraft/ffxiv-teamcraft/staging/apps/client/src/assets/data/items.json')
    .then(res => res.json())
    .then(itemNames => {
        const commissionSub = new CommissionSub(client, itemNames);

        commissionsCreatedTopic.on('message', message => {
            message.ack();
            const {event, commission} = JSON.parse(message.data.toString());
            if (!commission.datacenter) {
                return;
            }
            console.log('New event received', event, commission.datacenter, commission.name);
            switch (event) {
                case 'created':
                    commissionSub.commissionCreated(commission);
                    break;
                case 'updated':
                    commissionSub.commissionUpdated(commission);
                    break;
                case 'deleted':
                    commissionSub.commissionDeleted(commission);
                    break;

            }
        });

        console.log('Pub/Sub listener started');
    });

client.on('ready', () => {
    client.channels.fetch('825664183797284884').then(
        (generalChannel: TextChannel) => {
            patreonPledgesTopic.on('message', message => {
                message.ack();
                const {amountDisplay, yearly, id} = JSON.parse(message.data.toString());
                if (CacheService.INSTANCE.getItem(id) === undefined) {
                    // Patreon sometimes sends two requests because idk, so we're gonna avoid this here
                    CacheService.INSTANCE.setItem(id, 'true');
                    setTimeout(() => {
                        CacheService.INSTANCE.deleteItem(id);
                    }, 30000);
                    const embed = new MessageEmbed()
                        .setTitle('New patreon pledge')
                        .setURL('https://www.patreon.com/bePatron?u=702160')
                        .setDescription(`Someone just pledged $${amountDisplay} ${yearly ? 'per year' : 'per month'} on patreon, Yay!`)
                        .setFooter(
                            "patreon",
                            "https://c5.patreon.com/external/logo/downloads_logomark_color_on_coral.png"
                        )
                        .setColor("#F96854");

                    generalChannel.send(embed).then(() => {
                        console.log('Notified sub', amountDisplay, yearly, id);
                    });
                }
            })

            console.log('Patreon listener started', generalChannel.id);
        }
    );

    client.channels.fetch('639779833366315019').then((generalChannel: TextChannel) => {
        twitStream().then(t => {
            const stream = t.stream("statuses/filter", { track: ["#ffxivteamcraft"] });

            stream.on("connect", (request) => {
              console.log("Tweet listener started");
              stream.on("tweet", (tweet) => {
                if (tweet.user.screen_name === config.twitter_username) {
                    let tweetEmbed = new MessageEmbed()
                        .setAuthor(`@${tweet.user.screen_name}`, tweet.user.profile_image_url_https, `https://twitter.com/${tweet.user.screen_name}`)
                        .setDescription(`${tweet.text}\n\n[Tweet Link](https://twitter.com/${config.twitter_username}/status/${tweet.id})`)
                        .setColor('#1DA1F2')
                        .setFooter(tweet.created_at)
                        
                    generalChannel.send(tweetEmbed)
                }
              });
            });
        })
    })
})

/** Pre-startup validation of the bot config. */
function validateConfig(config: BotConfig) {
    if (!config.token) {
        throw new Error("You need to specify your Discord bot token!");
    }
}
