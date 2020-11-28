import Discord, {Message} from "discord.js";
import {BotConfig, config} from "./config/config";
import {CommandHandler} from "./command_handler";
import {CommissionCreationSub} from "./pub-sub/commission-creation-sub";

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

new CommissionCreationSub(client).start();

/** Pre-startup validation of the bot config. */
function validateConfig(config: BotConfig) {
    if (!config.token) {
        throw new Error("You need to specify your Discord bot token!");
    }
}
