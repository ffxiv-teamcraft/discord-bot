import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import { MessageEmbed } from "discord.js"

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
        .setDescription("**Attention PS4 Players** Packet capture does not work for the PS4, only on PC.")
        .addField("Is the app updated?", "Teamcraft needs to be on the latest version of the app for packet capture to work. Please check #announcements for the latest version. If you are not up to date please do so before continuing.")
        .addField("Are you using the Desktop App?", "Packet captures only works on the desktop app. Please make sure you have it downloaded and installed before trying to use packet capture.")
        .addField("If the above are true, please do the following.", "Open the ``!!console``, type ``window.debugPackets = true;`` and move in game/tp to a new zone. Is there any output?")
        .addField("There was no output! Please help!", "Try to re-install [npcap](https://nmap.org/npcap/dist/npcap-1.10.exe).")
        .addField("Still not working. :(", "Please try a ``!!dirtyinstall`` to make sure that you don't have old files related to TC laying around mucking things up.")
        .addField("Still nothing. Am I hopeless?", "The last thing you can do for us to help you is post your ``log.log`` to <#639503745176174592> alongside details regarding your issue. It is located in ``%appdata%/ffxiv-teamcraft``.")
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