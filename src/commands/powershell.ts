import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js"

export class PowershellCommand implements Command {
    commandNames = ["powershell"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}powershell to explain how to add Powershell to the Windows PATH variable, fixing a potential error where Deucalion cannot use tasklist as a command.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
        .setTitle("Your `main.log` appears to say tasklist is not recognized as a command, or there is some other reason you may need to fix Powershell")
        .setDescription("Ensure that Powershell is added to your PATH variable")
		.addFields([
			{
			name: "Update Powershell",
			value: "First, make sure Powershell is fully updated: <https://docs.microsoft.com/en-us/powershell/scripting/windows-powershell/install/installing-windows-powershell>"
			},
			{
			name: "Ensure that Powershell has been added to your PATH Variable:",
			value: "1. Press the Windows key, search \"env\" and hit enter \n 2. Click \"Environment Variables\" in the advanced tab \n 3. Under \"**System Variables**\", locate the Path entry \n 4. Click \"New\" and paste `%SystemRoot%\\system32\\WindowsPowerShell\\v1.0` \n 5. Click OK to confirm all this work, then try reopening TC and/or reinstalling Npcap!"
			},
			{
			name: "Update from Windows 7",
			value: "This issue basically only happens on Windows 7 or lower, and we actually do not support anything below Windows 10. Most programs and apps no longer do. There exist free ways to update as far as Win10."
			}
		])
        .setFooter({
                text: "ffxiv-teamcraft",
                iconURL: "https://ffxivteamcraft.com/assets/logo.png"
        })
        .setColor("#4880b1");
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}