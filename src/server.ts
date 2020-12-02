import Discord, {Message} from "discord.js";
import {BotConfig, config} from "./config/config";
import {CommandHandler} from "./command_handler";
import {CommissionSub} from "./pub-sub/commission-sub";
import express from "express";
import fetch from "node-fetch";

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

fetch('https://raw.githubusercontent.com/ffxiv-teamcraft/ffxiv-teamcraft/staging/apps/client/src/assets/data/items.json')
    .then(res => res.json())
    .then(itemNames => {
        const commissionSub = new CommissionSub(client, itemNames);

        const app = express();

        app.post('/commission-created', (req, res) => {
            commissionSub.commissionCreated(req.body);
            res.status(201).end();
        });

        app.post('/commission-updated', (req, res) => {
            commissionSub.commissionUpdated(req.body);
            res.status(201).end();
        });

        app.post('/commission-deleted', (req, res) => {
            commissionSub.commissionDeleted(req.body);
            res.status(201).end();
        });

        app.listen(8080);

        console.log('HTTP Server started')
    });


/** Pre-startup validation of the bot config. */
function validateConfig(config: BotConfig) {
    if (!config.token) {
        throw new Error("You need to specify your Discord bot token!");
    }
}
