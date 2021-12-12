import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import { MessageEmbed } from "discord.js"

export class ConsoleCommand implements Command {
    commandNames = ["console", "devtools"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}console to get information on how to open the chrome dev tools.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new MessageEmbed()
        .setTitle("How to open the console")
        .setDescription("Please open the console and take a screenshot of it to post in <#639503745176174592>.")
        .addField("Website", "Please press F12 on the keyboard and click the ``Console`` tab.")
        .addField("Desktop App", "Please navigate to your Profile > Settings > Desktop > Open Dev Tools and click the ``Console`` tab.")
        .addField("I can't get to my profile. How am I supposed to get to the console?", "``CTRL + SHIFT + I`` will also open the dev tools, allowing you to still get to the console if the app is not doing anything.")
        .setFooter(
          "ffxiv-teamcraft",
          "https://ffxivteamcraft.com/assets/logo.png"
        )
        .setColor("#4880b1");
        await parsedUserCommand.originalMessage.channel.send(embed);
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}