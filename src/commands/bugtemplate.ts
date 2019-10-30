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
        .setTitle("How to submit a bug report for Teamcraft")
        .addField("A clear and concise description of what the bug is.", ">")
        .addField("Steps to reproduce!", ">")
        .addField("Expected Behavior!", ">")
        .addField("Software Version/Type!", ">")
        .addField("Additional Information", ">")
        .addField("Screenshots!", ">")
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
