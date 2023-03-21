import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js"

export class ConsoleCommand implements Command {
    commandNames = ["console", "devtools"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}console to get information on how to open the chrome dev tools.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("How to open the console to take a screenshot")
            .setDescription("Please open the console and **take a screenshot** of it to post in <#639503745176174592>. You may find it useful to type \"Teamcraft\" in the Filter bar at the very top, to restrict the console so that errors from ads and such are filtered out!")
            .addFields({
                name: "Desktop App only",
                value: "You may navigate to your Profile in the upper-right > Settings > Desktop > Open Dev Tools and click the ``Console`` tab."
            })
            .addFields({
                name: "Desktop App or Website",
                value: "Please press ``CTRL + SHIFT + I`` (or ``Command + SHIFT + I`` on Mac) on the keyboard, and click the ``Console`` tab."
            })
            .setFooter({
                text: "ffxiv-teamcraft",
                iconURL: "https://ffxivteamcraft.com/assets/logo.png"
            })
            .setColor("#4880b1");
        await parsedUserCommand.originalMessage.channel.send({embeds: [embed]});
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}
