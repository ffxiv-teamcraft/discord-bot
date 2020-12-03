import Discord, {Message} from "discord.js";
import {BotConfig, config} from "./config/config";
import {CommandHandler} from "./command_handler";
import {CommissionSub} from "./pub-sub/commission-sub";
import fetch from "node-fetch";
import {PubSub} from "@google-cloud/pubsub";

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
const subscription = pubsub.topic('commissions-created').subscription('bot');

fetch('https://raw.githubusercontent.com/ffxiv-teamcraft/ffxiv-teamcraft/staging/apps/client/src/assets/data/items.json')
    .then(res => res.json())
    .then(itemNames => {
        const commissionSub = new CommissionSub(client, itemNames);

        subscription.on('message', message => {
            message.ack();
            const {event, commission} = JSON.parse(message.data.toString());
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


/** Pre-startup validation of the bot config. */
function validateConfig(config: BotConfig) {
    if (!config.token) {
        throw new Error("You need to specify your Discord bot token!");
    }
}
