import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js"

export class KasperskyCommand implements Command {
    commandNames = ["kaspersky"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}kaspersky to get information on how to whitelist firestore.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("Kaspersky")
            .setDescription("Kaspersky has sadly been blocking Firestore, which is used to serve Teamcraft's database, by default. It may also block the desktop app in general.")
			.addFields({
                name: "You will need to whitelist Teamcraft and its database in Kaspersky's settings.",
                value: "- Open Kaspersky and go to Settings \n - Click Security Settings \n - Click 'Exclusions and actions on object detection' near the bottom \n - Under exclusions and trusted applications, add ``%LocalAppData%\\ffxiv-teamcraft\\`` and ``%AppData%\\ffxiv-teamcraft\\`` \n - If need be, add the exact Teamcraft EXE to the exceptions, but be warned that you will need to update that every time Teamcraft updates \n - Return to Settings > Security Settings and go to Network Settings \n - Under Configure Trusted Addresses, click Add to add ``https://firestore.googleapis.com/*`` and ``https://*.firebaseio.com/*`` to the whitelist."
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
