import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js"

export class IgnoredCommand implements Command {
    commandNames = ["ignoredcharacter", "ichara", "chara", "character"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}console to get information on how to fix an ignored or unlinked character in Teamcraft.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("Issues with linked characters")
            .setDescription("Sometimes characters end up not linking properly, or show up as Unknown in inventory displays, or outdated retainer/inventory info continues to display, or a character is not detected when packet capture is working")
            .addFields({
                name: "Note:",
                value: "You must have a Teamcraft account and be logged in to it to ensure that character linking works properly."
            })
            .addFields({
                name: "If you are playing FFXIV using the Chinese client:",
                value: "Please ensure Teamcraft is pointed to the correct folder for your character data, as this differs between the Global and China regions."
            })
            .addFields({
                name: "To clean up potentially ignored or unlinked characters, please do the following:",
                value: "- Go to Settings, Desktop, then click the buttons to ``Reset ignored characters`` and ``Reset linked characters``. \n - Restart TC.\n - Go to the Inventory page and click the button to ``Reset all inventories``.\n - In game, use the right-click menu (or appropriate controller button) to Sort or Unsort your inventory. You may use Unsort to return your inventory to its previous state once you're done linking. *Make sure at least one item moves as you do this.* \n - This should trigger a popup to select your character in TC.\n - Once it's selected, teleport to a new zone. *It MUST be an entirely different zone than the one you are currently in -- for example, Limsa to Eulmore -- and will not work if you use aethernet teleports within the same zone."
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
