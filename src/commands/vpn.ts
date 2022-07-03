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

		switch(args[1]) {
		case 'nord':
		case 'nordvpn':
			embed
				.setTitle('NordVPN')
				.setDescription("Instructions for NordVPN")
				.addField("Warning:", "NordVPN cannot work with Teamcraft if the privacy features are active.")
				.addField("How To:", "Open NordVPN and click the gear in the top right to open settings. On the General tab, disable CyberSec.");
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
				.setTitle('NordVPN')
				.setDescription("Instructions for ExitLag")
				.addField("Warning:", "ExitLag does not work with Teamcraft due to how it changes packet structure. You *must* use RawSocket mode.")
			break;

		default:
			embed
				.setTitle('VPN')
				.setDescription("Packet Capture instructions for VPN users.")
				.addField("About VPNs and Teamcraft", "Teamcraft needs to see packets to parse them. Most VPNs hide packet contents for privacy, so Teamcraft isn't able to see them.")
				.addField("Generic VPN Instructions", "If your VPN is based on L2TP, it should Just Work™ in Teamcraft. If it's based on Wireguard, OpenVPN, or something more exotic you need to set Teamcraft to RawSocket mode in settings.")
				.addField("Specific VPN Instructions", "We have extra help for a few VPNs. You can see them by putting the VPN name after the command, such as '!!vpn mudfish'. The following list of VPNs have special instructions: ExitLag, Mudfish, NordVPN.");
			break;
				
		}

		embed.setFooter("ffxiv-teamcraft", "https://ffxivteamcraft.com/assets/logo.png")
		parsedUserCommand.originalMessage.reply(embed);
	}

	hasPermissionToRun(_: CommandContext): boolean {
		return true;
	}
}
