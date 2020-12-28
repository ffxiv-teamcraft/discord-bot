import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import { MessageEmbed } from "discord.js";

export class DirtyInstallCommand implements Command {
    commandNames = ["dirtyinstall", "cleanreinstall"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}dirtyinstall to receive steps to clean up a dirty teamcraft installation.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new MessageEmbed()
        .setTitle("Dirty Install Clean-up")
        .setDescription("You likely have a dirty install of TC laying around. Please do the following to fully ensure TC is closed and removed before reinstalling.")
        .addField("Close all instances of Teamcraft", "Open your task manager and please end all teamcraft processes.")
        .addField("Clean up old local files", "Press ``WIN+R`` and type ``%localappdata%``. Locate the ``ffxiv-teamcraft`` folder and delete it. Find it again in the ``programs`` folder and delete it.")
        .addField("Clean up old roaming files", "Press ``WIN+R`` and type ``%appdata%``. Locate the ``ffxiv-teamcraft`` folder and delete it.")
        .addField("Uninstall", "Please open ``Control Panel\\Programs\\Programs and Features`` and make sure that TC is not listed. If it is please click it and click uninstall. It might fuss about the app not being able to be found. Ignore this and click ok.")
        .addField("Restart Computer", "Restart your computer just to be certain that no Teamcraft related processes are running.")
        .addField("Download and Reinstall", "[Download the latest version of the app and install it.](https://ffxivteamcraft.com/desktop)")
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
