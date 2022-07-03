import {Command} from './command';
import {CommandContext} from '../models/command_context';
import {MessageEmbed} from 'discord.js';

export class VpnCommand implements Command {
	commandNames = ['vpn'];

	getHelpMessage(commandPrefix: string): string {
		return `Use ${commandPrefix}vpn or with arguments to load specific vpn info.`;
	}

	async run(parsedUserCommand: CommandContext): Promise<void> {
		const args = parsedUserCommand.originalMessage.content.slice(2).split(/ +/);
		const embed = new MessageEmbed();

		const useRawSocketBro = "In Teamcraft settings, set packet capture mode to Raw Socket."

		switch(args[1]) {
		case 'nord':
		case 'nordvpn':
			embed
				.setTitle('NordVPN')
				.setDescription("Instructions for NordVPN")
				.addField("Warning:", "NordVPN cannot work with Teamcraft if the privacy features are active.")
				.addField("How To:", "Open NordVPN and click the gear in the top right to open settings. On the General tab, disable CyberSec.")
				.addField("Packet Capture:", useRawSocketBro);
			break;

		case 'mudfish':
			embed
				.setTitle('Mudfish')
				.setDescription("Instructions for Mudfish")
				.addField("Warning:", "While Mudfish works just fine with Linux or MacOS, Windows users will need additional configuration. Teamcraft will not work with the WFP feature enabled.")
				.addField("How To:", "Open Mudfish and navigate to Settings->Programs. The WFP feature should be disabled.");
			break;

		case 'exitlag':
			embed
				.setTitle('ExitLag')
				.setDescription("Instructions for ExitLag")
				.addField("Warning:", "ExitLag does not work with Teamcraft due to how it changes packet structure. You *must* use Raw Socket mode for packet capture.")
				.addField("Packet Capture:", useRawSocketBro)
			break;

		case 'mullvad':
			embed
				.setTitle('Mullvad')
				.setDescription("Instructions for Mullvad")
				.addField("Warning:", "Mullvad's AdBlocker feature will break the connection to the Teamcraft database.")
				.addField("How To:", "Open Mullvad and disable the ad blocking feature. Mullvad's website has good alternatives that won't break Teamcraft.")
				.addField("Packet Capture:", useRawSocketBro);
			break;

		case 'openvpn':
		case 'wireguard':
			embed
				.setTitle('OpenVPN and Wireguard')
				.setDescription("Instructions for OpenVPN and Wireguard based VPNs")
				.addField("Warning:", "OpenVPN and Wireguard encapsulate packets, hiding them from Teamcraft. You *must* use Raw Socket mode for packet capture.")
				.addField("Packet Capture:", useRawSocketBro);
			break;

		default:
			embed
				.setTitle('VPN')
				.setDescription("Packet Capture instructions for VPN users.")
				.addField("About VPNs and Teamcraft:", "Teamcraft needs to see packets to parse them. Most VPNs hide packet contents for privacy, so Teamcraft isn't able to see them.")
				.addField("Generic VPN Instructions:", "If your VPN is based on L2TP, it should Just Work™ in Teamcraft. If it's based on Wireguard, OpenVPN, or something more exotic you need to set Teamcraft to Raw Socket mode in settings.")
				.addField("Specific VPN Instructions:", "We have extra help for some VPNs. You can see them by putting the VPN name after the command, such as '!!vpn mudfish'. The following list of VPNs have special instructions: ExitLag, Mudfish, Mullvad, NordVPN, OpenVPN, Wireguard.");
			break;
				
		}

		embed.setFooter("ffxiv-teamcraft", "https://ffxivteamcraft.com/assets/logo.png")
		parsedUserCommand.originalMessage.reply(embed);
	}

	hasPermissionToRun(_: CommandContext): boolean {
		return true;
	}
}
