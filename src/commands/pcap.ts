import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {MessageEmbed} from "discord.js"

export class PcapCommand implements Command {
    commandNames = ["pcap", "packetcapture"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}console to get information on how to troubleshoot packet capture in Teamcraft.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new MessageEmbed()
        .setTitle("Troubleshooting Packet Capture")
        .setDescription("Any steps using ``!!commands`` are **Discord bot commands** meant to be used in <#639503745176174592> or <#427756963867394048> for further instructions.\n\n**Attention PS4/PS5 Players** Packet capture does not work for the PS4/PS5, only on PC.")
		.addField("Are you using the Desktop App?", "Packet capture only works on the desktop app (and only when your game is running DirectX 11). Please make sure you have the app [downloaded](https://ffxivteamcraft.com/desktop) and installed before trying to use packet capture.")
        .addField("Is the app updated?", "Teamcraft needs to be on the latest version of the app for packet capture to work. Please check #updates for the latest version. If you are not up to date, please [update](https://ffxivteamcraft.com/desktop) before continuing.")
        .addField("Have you restarted Teamcraft?", "As of version 8.0.12, PCAP no longer requires a client update to update OPCodes. Restarting Teamcraft can resolve issues related to this.")
        .addField("Did you exclude Teamcraft from your antivirus?", "Many antivirus programs are blocking Teamcraft out of an abundance of caution, type the ``!!antivirus`` command in <#639503745176174592> or <#427756963867394048> to learn more.")
        .addField("If the above are true, please do the following.", "Open the ``!!console``, type ``window.debugPackets = true;``, hit Enter, and move in game/teleport to a new zone. Is there any output after ``true``?")
        .addField("There was no output! Please help!", "Please post your main.log (can be found in `%AppData%/ffxiv-teamcraft/logs/`) and the most recent deucalion session log (can be found in `%AppData%/deucalion`) in <#639503745176174592>.\n\n We should be able to find what's wrong based on that.")
		.addField("What if you *did* get output from ``window.debugPackets = true;``, but your inventory still isn't working right?", "Type the ``!!ichara`` command in <#639503745176174592> or <#427756963867394048> and follow the instructions, as it's possible you need to reset your character links.")
        .addField("Still not working. :(", "Please try a ``!!dirtyinstall`` to make sure that you don't have old files related to Teamcraft laying around mucking things up.")
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
