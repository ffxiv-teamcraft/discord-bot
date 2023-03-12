import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {MessageEmbed} from "discord.js"

export class LogsCommand implements Command {
    commandNames = ["logs"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}logs to get information on where to find your log files.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new MessageEmbed()
        .setTitle("Logs")
        .setDescription("Where to get each log file that can be useful for troubleshooting, the `%...%` path are meant to be used by pressing Win + R, pasting the path and pressing enter to open it in explorer.")
        .addField("Teamcraft log", "Main.log is the main log file for the Teamcraft desktop app, you can find it in `%AppData%/ffxiv-teamcraft/logs/`")
        .addField("Deucalion Session log", "Deucalion is the project that allows us to capture packets, its log files can be found in `%AppData%/deucalion` under the name `session-XXXXXXXXX.log`, pick the most recent one by ordering by last modified date.")
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
