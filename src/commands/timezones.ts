import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder, Role} from "discord.js";

const moment = require('moment-timezone');

export class TimezonesCommand implements Command {
    readonly commandNames: string[] = [
        'timezones'
    ];

    readonly modsTimezones = [
        {name: 'Miu', timezone: 'Europe/Paris'},
        {name: 'Venili', timezone: 'Europe/Berlin'},
        {name: 'Acchan', timezone: 'Australia/Melbourne'},
        {name: 'Qih', timezone: 'America/Los_Angeles'},
        {name: 'Tataru', timezone: 'Europe/London'},
        {name: 'Dis', timezone: 'America/New_York'},
        {name: 'Late', timezone: 'America/New_York'},
    ];

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}timezones to print hour at each of the moderators place.`;
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        const troubleshooterRole: Role = parsedUserCommand.originalMessage.guild.roles.cache.find(role => role.name === 'Troubleshooter');
        const moderatorRole: Role = parsedUserCommand.originalMessage.guild.roles.cache.find(role => role.name === 'Moderator');
        return parsedUserCommand.authorMember.roles.cache.has(troubleshooterRole.id) || parsedUserCommand.authorMember.roles.cache.has(moderatorRole.id);
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        let builtList = this.modsTimezones.reduce((str, row) => {
            return str + `\n - ${row.name}: ${moment().tz(row.timezone).format('hh:mm a')}`
        }, '');

        const embed = new EmbedBuilder()
            .setTitle("Moderators and time at their place")
            .setDescription(`${builtList}`)
            .setFooter({
                text: "ffxiv-teamcraft",
                iconURL: "https://ffxivteamcraft.com/assets/logo.png"
            })
            .setColor("#4bb1a8");
        await parsedUserCommand.originalMessage.channel.send({embeds: [embed]});
    }

}
