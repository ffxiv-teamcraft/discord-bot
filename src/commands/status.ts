import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {FirebaseCommand} from "./abstract/firebase-command";

export class StatusCommand extends FirebaseCommand implements Command {
    commandNames = ["status"];

    constructor() {
        super();
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}status to get the status of the bot and the servers.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const appVersion = await this.rtdb.ref('/app_version').once('value');
        await parsedUserCommand.originalMessage.reply(
            `Bot status: :white_check_mark:
            App version: ${appVersion.val()}`
        );
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}
