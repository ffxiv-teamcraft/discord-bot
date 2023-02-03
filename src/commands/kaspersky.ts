import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {MessageEmbed} from "discord.js"

export class KasperskyCommand implements Command {
    commandNames = ["kaspersky"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}kaspersky to get information on how to whitelist firestore.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new MessageEmbed()
        .setTitle("Kaspersky")
        .setDescription("Kaspersky has sadly been blocking Firestore, which is Teamcraft's database, by default.")
        .addField("One way this can be fixed is by whitelisting Firestore.", "Go to [Kaspersky](https://www.kaspersky.com.au/blog/kaspersky-add-exclusion/14765/) and add ``https://firestore.googleapis.com/*`` and ``https://*.firebaseio.com/*`` to the whitelist.")
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
