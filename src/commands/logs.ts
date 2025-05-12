import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js"

export class LogsCommand implements Command {
    commandNames = ["logs","log"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}logs to get information on where to find your log files.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("Logs")
            .setDescription("Where to get each log file that can be useful for troubleshooting; the ``%...%`` paths are meant to be used by pressing ``Win + R``, pasting the path and pressing Enter to open it in Explorer.")
            .addFields({
                name: "Teamcraft log",
                value: "``main.log`` is the main log file for the Teamcraft desktop app. You can find it in ``%AppData%\\ffxiv-teamcraft\\logs\\``"
            })
            .addFields({
                name: "Deucalion session log",
                value: "Deucalion is the project that allows us to capture packets. Its log files can be found in ``%AppData%\\deucalion`` under the name ``session-XXXXXXXXX.log``. Pick the most recent one by ordering by last modified date. It is possible that if Deucalion completely failed to even attempt to start, this folder and/or file may not have be generated at all. ``main.log`` above is usually more important and informative than this one."
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
