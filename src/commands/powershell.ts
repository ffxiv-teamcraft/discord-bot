import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {MessageEmbed} from "discord.js"

export class OpenExternalCommand implements Command {
    commandNames = ["powershell"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}powershell to explain how to add Powershell to the Windows PATH variable`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new MessageEmbed()
        .setTitle("Teamcraft doesn't think Npcap is installed")
        .setDescription("Ensure that Powershell is added to your PATH variable")
        .addField("Update Powershell", "First, make sure Powershell is fully updated: <https://docs.microsoft.com/en-us/powershell/scripting/windows-powershell/install/installing-windows-powershell>")
		.addField("Ensure that Powershell has been added to your PATH Variable:","1. Press the Windows key, search \"env\" and hit enter \n 2. Click \"Environment Variables\" in the advanced tab \n 3. Under \"**System Variables**\", locate the Path entry \n 4. Click \"New\" and paste `%SystemRoot%\system32\WindowsPowerShell\v1.0` \n 5. Click OK to confirm all this work, then try reopening TC and/or reinstalling Npcap!")
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
