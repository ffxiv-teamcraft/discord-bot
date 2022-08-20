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
        .setDescription("Any steps using ``!!commands`` are **Discord bot commands** meant to be used in <#639503745176174592> for further instructions.\n\n**Attention PS4/PS5 Players** Packet capture does not work for the PS4/PS5, only on PC.")
        .addField("Is the app updated?", "Teamcraft needs to be on the latest version of the app for packet capture to work. Please check #announcements for the latest version. If you are not up to date, please update before continuing.")
        .addField("Are you using the Desktop App?", "Packet capture only works on the desktop app. Please make sure you have it downloaded and installed before trying to use packet capture.")
        .addField("Have you restarted Teamcraft?", "As of version 8.0.12, PCAP no longer requires a client update to update OPCodes. Restarting Teamcraft can resolve issues related to this.")
        .addField("If the above are true, please do the following.", "Open the ``!!console``, type ``window.debugPackets = true;`` and move in game/teleport to a new zone. Is there any output?")
        .addField("There was no output! Please help!", "Try to re-install [NPcap](https://nmap.org/npcap/dist/npcap-1.50.exe). Make sure that 'install in Winpcap API-compatible mode' is enabled.")
		.addField("What if you *did* get output from ``window.debugPackets = true;``, but your inventory still isn't working right?", "Try the ``!!ichara`` command here in the server, as it's possible you need to reset your character links.")
        .addField("Still nothing? Are you using a VPN or a tool to lower your ping?", "Try the ``!!vpn generic`` command here in the server to see if we have suggested settings for your specific VPN! Generally, however, go to Settings, enable `RawSocket` capture mode, and restart TC as admin.")
        .addField("Still not working. :(", "Please try a ``!!dirtyinstall`` to make sure that you don't have old files related to Teamcraft laying around mucking things up.")
        .addField("Still nothing. Am I hopeless?", "The last thing you can do for us to help you is post your ``main.log`` to <#639503745176174592> alongside details regarding your issue. It is located in ``%appdata%/ffxiv-teamcraft/logs``.")
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
