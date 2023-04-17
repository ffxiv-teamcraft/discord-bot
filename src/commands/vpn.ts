import {Command} from './command';
import {CommandContext} from '../models/command_context';
import {EmbedBuilder} from 'discord.js';

export class VpnCommand implements Command {
	commandNames = ['vpn'];

	getHelpMessage(commandPrefix: string): string {
		return `Use ${commandPrefix}vpn or with arguments to load specific vpn info.`;
	}

	async run(parsedUserCommand: CommandContext): Promise<void> {
		const args = parsedUserCommand.originalMessage.content.slice(2).split(/ +/);
		const embed = new EmbedBuilder();

//		const useRawSocketBro = "In Teamcraft settings, set packet capture mode to Raw Socket."

		switch(args[1].toLowerCase()) {
		case 'nord':
		case 'nordvpn':
			embed
				.setTitle('NordVPN')
				.setDescription("Instructions for NordVPN")
				.addFields([
					{
					name: "Warning:",
					value: "NordVPN cannot work with Teamcraft if the Threat Protection features are active."
					},
					{
					name: "How To:",
					value: "Open NordVPN and click the gear in the top right to open settings. On the General tab, either disable Threat Protection, or add exceptions to it for ``ffxivteamcraft.com`` , ``firestore.googleapis.com`` , ``firebaseio.com`` , etc."
					}
				])
			await parsedUserCommand.originalMessage.reply({embeds: [embed]});
			break;

		case 'mudfish':
			embed
				.setTitle('Mudfish')
				.setDescription("Instructions for Mudfish")
				.addFields([
					{
					name: "Warning:",
					value: "While Mudfish works just fine with Linux or MacOS, Windows users will need additional configuration. Teamcraft will not work with the WFP feature enabled."
					},
					{
					name: "How To:",
					value: "Open Mudfish and navigate to Settings->Programs. The WFP feature should be disabled."
					}
				])
			await parsedUserCommand.originalMessage.reply({embeds: [embed]});
			break;

/*		case 'exitlag':
			embed
				.setTitle('ExitLag')
				.setDescription("Instructions for ExitLag")
				.addFields([
					{
					name: "Warning:",
					value: "ExitLag sux."
					},
					{
					name: "Packet Capture:",
					value: useRawSocketBro
					},
			break;
*/
		case 'mullvad':
			embed
				.setTitle('Mullvad')
				.setDescription("Instructions for Mullvad")
				.addFields([
					{
					name: "Warning:",
					value: "Mullvad's AdBlocker feature will break the connection to the Teamcraft database."
					},
					{
					name: "How To:",
					value: "Open Mullvad and disable the ad blocking feature. Mullvad's website has good alternatives that won't break Teamcraft."
					}
				])
			await parsedUserCommand.originalMessage.reply({embeds: [embed]});
			break;
/*
		case 'openvpn':
		case 'wireguard':
		case 'cloudflare':
			embed
				.setTitle('OpenVPN, Wireguard, Cloudflare, etc.')
				.setDescription("Instructions for OpenVPN and Wireguard based VPNs")
				.addFields([
					{
					name: "Warning:",
					value: "OpenVPN, Wireguard, and other VPNs that use these as their backbone (like Cloudflare's VPN) encapsulate packets, hiding them from Teamcraft. You *must* use Raw Socket mode for packet capture."
					},
					{
					name: "Packet Capture:",
					value: useRawSocketBro
					},
			break;
*/
		default:
			embed
				.setTitle('VPN')
				.setDescription("Packet Capture and Teamcraft compatibility instructions for VPN users")
				.addFields([
					{
					name: "About VPNs and Teamcraft:",
					value: "Teamcraft needs to see packets to parse them. Many VPNs hide packet contents for privacy, so Teamcraft may not be able to see them."
					},
					{
					name: "Specific VPN Instructions:",
					value: "We have specific help for some VPNs/security software. You can see them by putting the VPN name after the command, such as '!!vpn nordvpn'. The following list of VPNs have specific instructions: Mudfish, Mullvad, NordVPN."
					},
					{
					name: "Generic VPN Instructions:",
					value: "If your VPN is based on L2TP, it should Just Work™ in Teamcraft. If you believe it's possible your VPN or security software may be blocking vital URLs, please type ``!!blockedsite`` in <#639503745176174592> or <#427756963867394048> and try to make exceptions for those sites in your VPN."
					}
				])
			.setFooter({
            text: "ffxiv-teamcraft",
            iconURL: "https://ffxivteamcraft.com/assets/logo.png"
			})
			.setColor("#4880b1");
			break;
		}

		await parsedUserCommand.originalMessage.channel.send({embeds: [embed]});
	}

	hasPermissionToRun(_: CommandContext): boolean {
		return true;
	}
}