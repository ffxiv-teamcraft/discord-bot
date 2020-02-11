import {Command} from "./command";
import {CommandContext} from "../models/command_context";

export class DirtyInstallCommand implements Command {
    commandNames = ["dirtyinstall", "cleanreinstall"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}dirtyinstall to receive steps to clean up a dirty teamcraft installation.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        await parsedUserCommand.originalMessage.channel.send("You likely have a dirty install laying around please do the following to fully ensure TC is closed and removed before reinstalling. \n```- Open task manager and end all teamcraft processes\n- Navigate to your appdata folder it is going to be the following path replaced with your windows username C:\\Users\\USERNAME\\AppData\n- Navigate into the roaming folder and please delete the ffxiv-teamcraft folder.\n- Go back to appdata and navigate to the local/Programs folder and delete ffxiv-teamcraft.\n- Please open Control Panel\\Programs\\Programs and Features and make sure teamcraft is not listed in the list of installed programs if it is please click it and click uninstall it will fuss and say that the app cannot be\n  found, just click yes and it should remove it from the list.\n- Restart your computer, this is just in case a lingering instance is holding on to the port TC uses its weird I couldn't tell you why it happens it just does and a restart will fix it.\n- Install Teamcraft from https://ffxivteamcraft.com/desktop```");
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}
