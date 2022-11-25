import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {MessageEmbed} from "discord.js"

export class BugTemplateCommand implements Command {
    commandNames = ["bugtemplate", "btemp"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}bug to get information on how to submit a bug report.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new MessageEmbed()
        .setTitle("Bug Report Template")
        .setDescription("```**Issue:** \n A clear and concise description of what the bug is. \n> \n**Steps to Reproduce:** \n A bug that can't be reproduced can't be fixed. Explain in detail, with numbered steps, what needs to be done to create the bug you are experiencing. \n> \n**Expected Behaviour:** \n A clear and concise description of what you expected to happen. \n> \n**Teamcraft Version - Browser / Desktop Client** \n Are you using the website or the desktop app? If the app, then which version? If the website, then which browser? \n> \n**Additional Information:** \n Any additional context that may help diagnose the issue. The more info, the better! \n> \n**Screenshots (Discord lets you attach multiple if need be):**\n\nCopy this template and fill next to the > ```")
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
