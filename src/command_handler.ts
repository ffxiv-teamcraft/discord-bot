import {Message} from "discord.js";
import {Command} from "./commands/command";
import {CommandContext} from "./models/command_context";
import {HelpCommand} from "./commands/help";
import {reactor} from "./reactions/reactor";
import {GreetCommand} from "./commands/greet";
import {BugCommand} from "./commands/bug";
import {config} from "./config/config";
import {StatusCommand} from "./commands/status";
import {ConsoleCommand} from "./commands/console";
import {WikiCommand} from "./commands/wiki";
import {KasperskyCommand} from "./commands/kaspersky";
import {RotationHelpCommand} from "./commands/rotation-help";
import {BugTemplateCommand} from "./commands/bugtemplate";
import {OpenExternalCommand} from "./commands/opendesktop";
import {TimezonesCommand} from "./commands/timezones";
import {DirtyInstallCommand} from "./commands/dirty";
import {FixTimeCommand} from "./commands/time";
import {MemberCountCommand} from "./commands/membercount";
import {PcapCommand} from "./commands/pcap";
import {IgnoredCommand} from "./commands/ignored";
import {FaqCommand} from "./commands/faq";
import {AntivirusCommand} from "./commands/antivirus";
import {ClearSiteDataCommand} from "./commands/clearsitedata";
import {BlockedSiteCommand} from "./commands/blockedsite";
import {BitDefenderCommand} from "./commands/bit-defender";
import {LogsCommand} from "./commands/logs";
import {ProfitsApiCommand} from "./commands/profits-api";
import {PowershellCommand} from "./commands/powershell";
import {VpnCommand} from "./commands/vpn";
import {DesktopCommand} from "./commands/desktopapp";

/** Handler for bot commands issued by users. */
export class CommandHandler {
    private readonly commands: Command[];

    private readonly prefix: string;

    constructor(prefix: string) {
        const commandClasses = [
            GreetCommand,
            StatusCommand,
            BugCommand,
            ConsoleCommand,
            WikiCommand,
            KasperskyCommand,
            BitDefenderCommand,
            LogsCommand,
            RotationHelpCommand,
            BugTemplateCommand,
            OpenExternalCommand,
            DirtyInstallCommand,
            FixTimeCommand,
            TimezonesCommand,
            MemberCountCommand,
            PcapCommand,
            IgnoredCommand,
            FaqCommand,
            AntivirusCommand,
            ClearSiteDataCommand,
            BlockedSiteCommand,
			PowershellCommand,
			VpnCommand,
            ProfitsApiCommand,
			DesktopCommand
        ];

        this.commands = commandClasses.map(commandClass => new commandClass());
        this.commands.push(new HelpCommand(this.commands));
        this.prefix = prefix;
    }

    /** Executes user commands contained in a message if appropriate. */
    async handleMessage(message: Message): Promise<void> {
        if (message.author.bot || !this.isCommand(message)) {
            return;
        }

        const commandContext = new CommandContext(message, this.prefix);

        const allowedCommands = this.commands.filter(command => command.hasPermissionToRun(commandContext));
        const matchedCommand = this.commands.find(command => command.commandNames.includes(commandContext.parsedCommandName));

        try {
            if (!matchedCommand) {
                await reactor.failure(message);
            } else if (!allowedCommands.includes(matchedCommand)) {
                await message.reply(`You aren't allowed to use that command. Try ${config.prefix}help.`);
                await reactor.failure(message);
            } else {
                await matchedCommand.run(commandContext).then(() => {
                    reactor.success(message);
                }).catch(reason => {
                    console.error(reason);
                    reactor.failure(message);
                });
            }
        } catch (err) {
            console.error(err);
        }
    }

    /** Determines whether or not a message is a user command. */
    private isCommand(message: Message): boolean {
        return message.content.startsWith(this.prefix);
    }
}
