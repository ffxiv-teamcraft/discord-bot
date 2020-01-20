import {Command} from "./command";
import {CommandContext} from "../models/command_context";

export class ConsoleCommand implements Command {
    commandNames = ["console", "devtools"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}console to get information on how to open the chrome dev tools.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        await parsedUserCommand.originalMessage.channel.send("**To Open Dev Tools in the desktop app:** Go to the top right where your profile is then Settings > Desktop > Dev Tools. Click the console tab. \n **Website:** F12 on the keyboard. Click the console tab. ");
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}