import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js";

export class DirtyInstallCommand implements Command {
    commandNames = ["dirtyinstall", "cleanreinstall"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}dirtyinstall to receive steps to clean up a dirty teamcraft installation.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("Dirty Install Clean-up")
            .setDescription("You likely have a dirty install of Teamcraft laying around. Please do the following to fully ensure TC is closed and removed before reinstalling.")
            .addFields([{
                name: "Back up any offline lists you wish to keep",
                value: "This process will clear any offline lists you may have made. If you wish to back up a an offline list to your Teamcraft account, open the List itself and click the button near the top to 'Copy this list to your account'."
            },
                {
                    name: "Consider backing up your Desktop settings to make the reinstall more convenient",
                    value: "Go to Settings > General and scroll down to find the button to Export settings. You may scroll down to this again after you have reinstalled Teamcraft and Import settings."
                },
                {
                    name: "Close all instances of Teamcraft",
                    value: "Open your Task Manager and please end all Teamcraft processes."
                },
                {
                    name: "Clean up old Local files",
                    value: "Press ``WIN+R`` and type ``%localappdata%``. Locate the ``ffxiv-teamcraft`` folder and delete it. Find it again in the ``Programs`` folder, if it exists there, and delete it."
                },
                {
                    name: "Clean up old Roaming files",
                    value: "Press ``WIN+R`` and type ``%appdata%``. Locate the ``ffxiv-teamcraft`` folder and delete it."
                },
                {
                    name: "Uninstall Teamcraft",
                    value: "Please open ``Control Panel\\Programs\\Programs and Features`` and make sure that TC is not listed. If it is please click it and click uninstall. It might fuss about the app not being able to be found. You may safely ignore this and click ok."
                },
                {
                    name: "Uninstall win10pcap",
                    value: "If you have win10pcap installed, please uninstall this before reinstalling Teamcraft or NPcap."
                },
                {
                    name: "Restart Computer",
                    value: "Restart your computer just to be certain that no Teamcraft-related processes are running."
                },
                {
                    name: "Download and Reinstall",
                    value: "[Download the latest version of the app and install it.](https://ffxivteamcraft.com/desktop)"
                },
            ])
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
