import {Command} from "./command";
import {CommandContext} from "../models/command_context";

export class IgnoredCommand implements Command {
    commandNames = ["ignoredcharacter", "ichara"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}console to get information on how to fix an ignored or unlinked character in Teamcraft.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        let txt = `**To clean up potentially ignored or unlinked characters please do the following:**\n - Go to settings, reset linked characters and ignored characters.\n - Restart TC.\n - Go to inventory page, reset all inventories.\n - In game, sort your inventory. *Make sure at least one item moves.* This should trigger a popup to select your character in TC.\n - Once it's selected, teleport to a new zone. *It has to be a different one than you are currently in for example, limsa to eulmore.`
        await parsedUserCommand.originalMessage.channel.send(txt);
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}
