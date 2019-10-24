import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {RichEmbed} from "discord.js"

export class ClearLocalCommand implements Command {
    commandNames = ["clearlocal", "localstorage"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}clearlocal to learn how to clear the local storage and cache on the desktop app`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new RichEmbed()
        .setAuthor(`Supamiu`, ``, `https://github.com/ffxiv-teamcraft/ffxiv-teamcraft/`)
        .setTitle("How to clear local storage and cache on the desktop app")
        .addField("Close the app", "Make sure the app is closed in its entirety.")
        .addField("Open the Run Dialog", "Press Windows Key + R")
        .addField("Navigate to the teamcraft folder", "Type %appdata% and navigate to the ffxiv-teamcraft folder")
        .addField("Clear the Cache and Local Storage folders", "Just delete the Cache and Local Storage folders")
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