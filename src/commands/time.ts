import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js";

export class FixTimeCommand implements Command {
    commandNames = ["time","alarms", "alarmclock"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}time to get information on how to fix incorrect alarm times`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("Troubleshooting Alarm Times")
            .setDescription("If you are having issues with timed node alarms being early or late, then your computer's clock may be off! Check [Time.is](https://time.is/) to see if your Windows time is far enough off to give inaccurate times. \n\nYou can just disable and re-enable Windows auto time sync and it should fix itself.")
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
