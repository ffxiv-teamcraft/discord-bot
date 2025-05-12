import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js"

export class BlockedSiteCommand implements Command {
    commandNames = ["blockedsite"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}blockedsite to explain which sites you may need to allow through your VPN, antivirus, adblocker, etc. to ensure proper Teamcraft functionality.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("Your PC or browser might be blocking one of the core sites Teamcraft needs to function")
            .setDescription("You should ensure that there are some exceptions for Teamcraft-related hosts added to your VPN/antivirus/adblocker/security/firewall program.")
            .addFields({
                name: "Note for Chinese users (especially):",
                value: "Please note that Github, which is used for the automatic updater for Teamcraft, is typically blocked in China. You may configure your preferred proxy in the desktop app via Settings, Desktop, Networking to try and get around this, or you may have better luck manually downloading updates to the app from ``ffxivteamcraft.com/desktop`` via your web browser. If you are not in China or another country that routinely blocks Github, please ensure that ``github.com`` is allowed through your security software."
            })
            .addFields({
                name: "We already have specific instructions for Kaspersky:",
                value: "Type ``!!kaspersky`` in the <#427756963867394048> or <#639503745176174592> channels to see instructions specific to allowing the appropriate sites through Kaspersky."
            })
            .addFields({
                name: "We may also already have some specific instructions to follow for your VPN:",
                value: "Type ``!!vpn generic`` in <#427756963867394048> or <#639503745176174592> to see if your VPN is among the ones for which we already have instructions."
            })
            .addFields({
                name: "Sites you should add to any 'allow' feature your security software might have",
                value: "If the security software you're using is not listed among the options above for which we already have commands, please try adding ``ffxivteamcraft.com`` , ``firestore.googleapis.com`` , and ``*.firebaseio.com`` to the allowed list for your VPN/antivirus/adblocker/security software/firewall. \nThere are many different types of software a user could have installed that might be blocking these sites and not a lot of troubleshooters, so please attempt to look up instructions for how to allow a URL *before* asking troubleshooters for help to find the feature in your software. If the feature does not seem to exist, or allowing these sites does not seem to resolve your issue, please let us know and we will continue to help you troubleshoot the problem!"
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
