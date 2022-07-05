import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {MessageEmbed} from "discord.js"

export class BugCommand implements Command {
    commandNames = ["bug", "bug-report"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}bug to get information on how to submit a bug report`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new MessageEmbed()
        .setTitle("How to submit a bug report for Teamcraft")
        .setDescription("A clear and concise description of what the bug is.")
        .addField("Steps to reproduce!", "A bug that can't be reproduced can't be fixed. Explain in detail what needs to be done to create the bug you are experiencing.")
        .addField("Expected Behavior!", "A clear and concise description of what you expected to happen.")
        .addField("Screenshots!", "Please provide any screenshots you can of what is happening. Opening the console via CTRL + SHIFT + I and clicking the console tab can also help us diagnose the issue.")
        .addField("Software Version/Type!", "Are you using the website or the desktop app? If the app then what version? If the website then what browser?")
        .addField("Additional Information", "Any additional context can help diagnose the issue. The more info the better!")
        .addField("Bug Template", "```**Issue:** \n> \n**Steps to Reproduce:**\n> \n**Expected Behaviour:**\n> \n**Teamcraft Version - Browser / Desktop Client**\n> \n**Additional Information:**\n> \n**Screenshots:**\n\nCopy this and fill next to the > ```")
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
