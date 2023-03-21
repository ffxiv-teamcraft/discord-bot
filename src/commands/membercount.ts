import {Command} from "./command";
import {EmbedBuilder, Role} from "discord.js";
import {CommandContext} from "../models/command_context";

export class MemberCountCommand implements Command {

    commandNames = ['membercount'];

    getHelpMessage(commandPrefix: string): string {
        throw `Use ${commandPrefix}membercount to get a member count`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const patronRole: Role = parsedUserCommand.originalMessage.guild.roles.cache.find(
            role => role.name === 'Patrons'
        );

        const members = parsedUserCommand.originalMessage.guild.members;
        const humanCount = members.cache.filter(member => !member.user.bot).size;
        let patronCount: number;
        if (patronRole) {
            patronCount = members.cache.filter(member => member.roles.cache.has(patronRole.id)).size;
        }
        const botCount = members.cache.filter(member => member.user.bot).size;

        const embed = new EmbedBuilder()
            .setTitle('Member Count!')
            .addFields([
                {name: 'Total Members:', value: members.cache.size.toString()},
                {name: 'Human count:', value: humanCount.toString()},
                {name: 'Patrons:', value: (!patronRole ? 0 : patronCount).toString()},
                {name: 'Bot count:', value: botCount.toString()}
            ])
            .setFooter({
                text: "ffxiv-teamcraft",
                iconURL: "https://ffxivteamcraft.com/assets/logo.png"
            })
            .setColor("#4880b1");

        await parsedUserCommand.originalMessage.channel.send({embeds: [embed]});
    }


    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        const requiredRole: Role = parsedUserCommand.originalMessage.guild.roles.cache.find(
            role => role.name === 'Moderator'
        );
        if (requiredRole) {
            return parsedUserCommand.authorMember.roles.cache.has(
                requiredRole.id
            );
        } else {
            console.log('The server does not have the role required for this command.');
            return false;
        }
    }

}
