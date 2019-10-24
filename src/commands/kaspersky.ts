import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {RichEmbed} from "discord.js"

export class KasperskyCommand implements Command {
    commandNames = ["kaspersky"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}kaspersky to get information on how to whitelist firestore.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new RichEmbed()
        .setTitle("Kaspersky")
        .setDescription("Sadly Kaspersky has been blocking Firestore by default, which is Teamcrafts database. ")
        .addField("However one way this can be fixed is by whitelisting Firestore.", "Go to [Kaspersky](https://www.kaspersky.com.au/blog/kaspersky-add-exclusion/14765/) and add ``https://firestore.googleapis.com/*`` to the whitelist")
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