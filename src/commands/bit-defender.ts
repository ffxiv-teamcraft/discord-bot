import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {MessageEmbed} from "discord.js"

export class BitDefenderCommand implements Command {
    commandNames = ["bitdefender"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}bitdefender to get information on how to deal with BitDefender issues.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new MessageEmbed()
        .setTitle("BitDefender")
        .setDescription("Teamcraft desktop app is blocked by BitDefender")
        .addField("One way this can be fixed is by whitelisting `%LocalAppData%/ffxiv-teamcraft/app-X.X.X/FFXIV Teamcraft.exe`.", "This is only temporary as the path to the exe file changes with every update, that's how Squirrel installer does it.")
        .addField("Another way to fix this is to use another antivirus, BitDefender is just lazy", "BitDefender is triggered by Teamcraft's packet capture system because it calls win32 api to inject a dll in the game process, which makes BitDefender react immediately.\nIt doesn't check what's injected or how it's used, injection = trigger, which is just lazy.")
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
