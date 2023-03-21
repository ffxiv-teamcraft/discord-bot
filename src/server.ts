import {Client, EmbedBuilder, Events, GatewayIntentBits, Message, TextChannel} from "discord.js";
import {BotConfig, config} from "./config/config";
import {CommandHandler} from "./command_handler";
import {CommissionSub} from "./pub-sub/commission-sub";
import fetch from "node-fetch";
import {PubSub} from "@google-cloud/pubsub";
import {CacheService} from "./core/cache-service";
import {LogFilesHandler} from "./log-files-handler";

validateConfig(config);

const commandHandler = new CommandHandler(config.prefix);
const logFilesHandler = new LogFilesHandler();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
    ]
});

//https://discordapp.com/api/oauth2/authorize?client_id=782224077632962571&permissions=322624&scope=bot

client.once(Events.ClientReady, () => {
    console.log("Bot has started");
});

client.on(Events.MessageCreate, async (message: Message) => {
    try {
        const attachment = message.attachments.first();
        if (attachment?.name === 'main.log') {
            await logFilesHandler.handleMessage(message);
        } else {
            await commandHandler.handleMessage(message);
        }
    } catch (err) {
        console.error(err);
    }
});

client.on(Events.Error, e => {
    console.error("Discord client error!", e);
});

client.login(config.token);

const pubsub = new PubSub({projectId: 'ffxivteamcraft'});
const commissionsCreatedTopic = pubsub.topic('commissions-created').subscription('bot');
const patreonPledgesTopic = pubsub.topic('patreon-pledges').subscription('patreon-pledges-sub');

fetch('https://raw.githubusercontent.com/ffxiv-teamcraft/ffxiv-teamcraft/staging/libs/data/src/lib/json/items.json')
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

client.once(Events.ClientReady, () => {
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
                    const embed = new EmbedBuilder()
                        .setTitle('New patreon pledge')
                        .setURL('https://www.patreon.com/bePatron?u=702160')
                        .setDescription(`Someone just pledged $${amountDisplay} ${yearly ? 'per year' : 'per month'} on patreon, Yay!`)
                        .setFooter(
                            {
                                text: "patreon",
                                iconURL: "https://c5.patreon.com/external/logo/downloads_logomark_color_on_coral.png"
                            }
                        )
                        .setColor("#F96854");

                    generalChannel.send({embeds: [embed]}).then(() => {
                        console.log('Notified sub', amountDisplay, yearly, id);
                    });
                }
            })

            console.log('Patreon listener started', generalChannel.id);
        }
    );
})

/** Pre-startup validation of the bot config. */
function validateConfig(config: BotConfig) {
    if (!config.token) {
        throw new Error("You need to specify your Discord bot token!");
    }
}
