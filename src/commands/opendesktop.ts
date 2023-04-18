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
            .setDescription("To open a link in the desktop app you may simply replace ``https://teamcraft.com`` with ``teamcraft://`` .")
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
