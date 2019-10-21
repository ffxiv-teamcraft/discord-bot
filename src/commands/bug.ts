import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {DatabaseCommand} from "./database-command";

export class BugCommand extends DatabaseCommand implements Command {
    commandNames = ["bug", "bug-report"];

    constructor() {
        super();
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}bug to get information on how to submit a bug report`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        await parsedUserCommand.originalMessage.reply("**Describe the bug** A clear and concise description of what the bug is. \n\n **Steps to Reproduce** Detailed steps on how to reproduce the bug. A bug that can't be reproduced is a bug that can't be fixed. \n\n **Expected Behavior** A clear and concise description of what you expected to happen. \n\n **Screenshots** If possible provide screenshots to help explain the issue. Using ``CTRL + SHIFT + I``, opening the console tab and showing us what is in there also helps a ton. \n\n **Environment** What environment are you running things on? Is it the desktop app or the website? If the app, what version? If the site, what browser are you using?");
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}
