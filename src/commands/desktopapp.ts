import {Command} from "./command";
import {CommandContext} from "../models/command_context";

export class DesktopCommand implements Command {
    commandNames = ["desktop","download","desktopapp","desktop-app"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}desktop or download or desktop-app or desktopapp to link to the page for downloading the desktop app.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        await parsedUserCommand.originalMessage.channel.send("https://ffxivteamcraft.com/desktop");
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}