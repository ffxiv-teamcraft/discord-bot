import {Command} from "./command";
import {CommandContext} from "../models/command_context";

export class FixTimeCommand implements Command {
    commandNames = ["time", "alarmclock"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}time to get information on how to fix incorrect alarm times`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        await parsedUserCommand.originalMessage.channel.send("If you are having issues with timed node alarms being early or late then your computers clock may be off! Check https://time.is/ to see how off your windows clock is. \nYou can just disable and re-enable windows auto time sync and it will fix itself.");
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}