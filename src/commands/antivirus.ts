import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {MessageEmbed} from "discord.js"

export class AntivirusCommand implements Command {
    commandNames = ["antivirus", "machinawrapper"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}antivirus to get information on which folders and files to whitelist in your antivirus.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new MessageEmbed()
        .setTitle("MachinaWrapper might be getting blocked by your antivirus")
        .setDescription("Many antivirus programs might attempt to block Teamcraft or its installer, out of an abundance of caution.")
        .addField("Please try excluding the entire Teamcraft install folder in your antivirus.", "Teamcraft should be located at ``%LocalAppData%\\ffxiv-teamcraft\\``.")
		.addField("This may have caused the download or installation of your installer to become corrupted", "Since it is likely that the Teamcraft app may not have been installed properly due to this blocking, please re-download and re-install Teamcraft to ensure all components have been installed properly. You may type ``!!dirtyinstall`` in <#639503745176174592> or <#427756963867394048> to ensure the old install is properly removed.")
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
