import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js"

export class OpenExternalCommand implements Command {
    commandNames = ["opendesktop", "opendesk"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}opendesktop to explain how to open urls in the desktop app`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("How to open a link in the desktop app")
			.setDescription("It is possible to make most links to Teamcraft pages open in the desktop app instead of your browser.")
            .addFields({
                name: "Enable opening links in desktop app from Settings on web",
                value: "- On the web version of Teamcraft, hover over your character name and pic to go to Settings \n - Near the top of General settings, tick the checkbox to enable ``Open links in desktop app when it is started``"
            })
			.setDescription("It is also possible to easily open an individual page from web in the desktop app.")
            .addFields({
                name: "Click the ``Open in desktop app`` button to open a page in the desktop app.",
                value: "- Open any Teamcraft database page (not Guides) - In the upper-right near your name and pic, click ``Open links in desktop app``"
            })
			
            .setDescription("Another way to open a page in the desktop app is to simply replace ``https://teamcraft.com`` with ``teamcraft://`` .")
            .addFields({
                name: "Example",
                value: "``https://ffxivteamcraft.com/teams/invite/example`` \n becomes \n``teamcraft://teams/invite/example``"
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
