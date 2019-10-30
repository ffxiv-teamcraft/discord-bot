import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import { RichEmbed } from "discord.js"

export class BugTemplateCommand implements Command {
    commandNames = ["bugtemplate", "btemp"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}bug to get information on how to submit a bug report`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new RichEmbed()
        .setTitle("Bug Report Template")
        .setDescription("```**Issue:** \n> \n**Steps to Reproduce:**\n> \n**Expected Behaviour:**\n> \n**Teamcraft Version - Browser / Desktop Client**\n> \n**Additional Information:**\n> \n**Screenshots:**\n\nCopy this and fill next to the > ```")
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
