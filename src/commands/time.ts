import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import { MessageEmbed } from "discord.js";

export class FixTimeCommand implements Command {
    commandNames = ["time", "alarmclock"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}time to get information on how to fix incorrect alarm times`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new MessageEmbed()
        .setTitle("Troubleshooting Alarm Times")
        .setDescription("If you are having issues with timed node alarms being early or late then your computers clock may be off! Check [Time.is](https://time.is/) to see how off your windows clock is.\n\nYou can just disable and re-enable windows auto time sync and it will fix itself.")
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