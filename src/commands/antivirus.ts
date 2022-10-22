import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {MessageEmbed} from "discord.js"

export class MachinaWrapperCommand implements Command {
    commandNames = ["machinawrapper,antivirus"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}antivirus to get information on which folders and files to whitelist in your antivirus.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new MessageEmbed()
        .setTitle("MachinaWrapper is likely getting blocked by your antivirus")
        .setDescription("Many antivirus programs might attempt to block MachinaWrapper (needed for packet capture), or even the entire Teamcraft app installer, out of an abundance of caution.")
        .addField("Please try excluding the entire Teamcraft install folder, especially the MachinaWrapper folder (and/or the files `MachinaWrapper.exe`, `Machina.dll`, and `Machina.FFXIV.dll`), in your antivirus. MachinaWrapper should be located at `%LocalAppData%\ffxiv-teamcraft\app-x.y.z\resources\MachinaWrapper\` (where x.y.z is the latest version number). You may also wish to right-click and check the Properties of the EXE and DLL files in the folder to make sure Windows itself isn't showing an \"Unblock\" button near the bottom that you may click to unblock the file. \n If you suspect that any part of the Teamcraft app may not have been installed properly due to the blocking, please re-download and re-install Teamcraft.")
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
