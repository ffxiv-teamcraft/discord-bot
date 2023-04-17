import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js"

export class BitDefenderCommand implements Command {
    commandNames = ["bitdefender"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}bitdefender to get information on how to deal with BitDefender issues.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("BitDefender")
            .setDescription("Teamcraft desktop app is being blocked by BitDefender")
            .addFields({
                name: "One way this can be fixed is by whitelisting ``%LocalAppData%\\ffxiv-teamcraft\\app-X.X.X\\FFXIV Teamcraft.exe`` in Advanced Threat Defense, and the whole ``%LocalAppData%\\ffxiv-teamcraft\\`` folder in the main part of the antivirus.",
                value: "The Advanced Threat Defense workaround is unfortunately only temporary, as the path to the EXE file changes with every update because of how Squirrel Installer works."
            })
			.addFields({
                name: "Another way to fix this would be to use another antivirus, as BitDefender is just lazy and this is merely one example of that.",
                value: "BitDefender is triggered by Teamcraft's packet capture system because it calls the win32 api to inject a dll in the game process, which makes BitDefender react immediately. \n It doesn't check what's injected or how it's used -- injection = trigger -- which is overzealous and not best practices on their part."
            })
			.addFields({
                name: "BitDefender may even have locked down your FFXIV config files and added firewall rules while being overzealous in its protection.",
                value: "For the firewall rules, ensure that ``FFXIV Teamcraft.exe`` does not have any rules to block connections in your firewall. \n If your config files were locked down, perform the whitelisting mentioned above, then try to remove the potential read-only statuses from both the Teamcraft folder and ``C:\\Users\\[username]\\Documents\\My Games\\FINAL FANTASY XIV - A Realm Reborn`` by right-clicking those folders, selecting Properties, and toggling off \"Read Only\" and hitting OK. Restart your computer, then run the ``!!dirtyinstall`` process to ensure that your reinstall of Teamcraft is complete and successful. Ideally this should mean that you do not have to retrieve your game settings from any backup you may have saved to the server, but we can't fully promise this since BitDefender is short-sighted in casually locking down the files like that. (See the above point about perhaps switching to a better antivirus.)"
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
