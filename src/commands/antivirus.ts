import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js"

export class AntivirusCommand implements Command {
    commandNames = ["antivirus"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}antivirus to get information on which folders and files to whitelist in your antivirus.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("Teamcraft might be getting blocked by your antivirus")
            .setDescription("Many antivirus programs might attempt to block Teamcraft or its installer, out of an abundance of caution.")
			.addFields({
                name: "If you have \"no\" antivirus, AKA you have only the default Microsoft Defender installed, you will likely want to follow the detailed instructions from the wiki to resolve this",
                value: "[__Regarding recent issues with antivirus false positives__](<https://wiki.ffxivteamcraft.com/troubleshooting#current-issues-with-antivirus-false-positives>) "
            })
            .addFields({
                name: "For other antivirus products you may have installed, the wiki instructions may still be helpful, but chiefly, please try excluding the entire Teamcraft install folder in your antivirus.",
                value: "Teamcraft should be located at ``%LocalAppData%\\ffxiv-teamcraft\\``."
            })
            .addFields({
                name: "Either way, this may have caused the download or installation of your installer to become corrupted",
                value: "Since it is likely that the Teamcraft app may not have been installed properly due to this blocking, please re-download and re-install Teamcraft to ensure that all components have been installed properly. You may type ``!!dirtyinstall`` in <#639503745176174592> or <#427756963867394048> to ensure that the old install is properly removed."
            })
            .addFields({
                name: "BitDefender",
                value: "BitDefender is a special case. Type `!!bitdefender` in <#427756963867394048> or <#639503745176174592> to learn more about it."
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
