import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {DatabaseCommand} from "./database-command";

export class GreetCommand extends DatabaseCommand implements Command {
    commandNames = ["greet", "hello"];

    constructor() {
        super();
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}greet to get a greeting.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        await parsedUserCommand.originalMessage.reply("hello, world!");
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}
