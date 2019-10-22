import {Command} from "./command";
import {CommandContext} from "../models/command_context";

export class WikiCommand implements Command {
    commandNames = ["wiki"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}wiki to link the wiki.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        await parsedUserCommand.originalMessage.channel.send("https://wiki.ffxivteamcraft.com/");
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}