import { Command } from "./command";
import { Role, RichEmbed } from "discord.js";
import { CommandContext } from "../models/command_context";

export class MemberCountCommand implements Command {

  commandNames = ['membercount'];  
  
  getHelpMessage(commandPrefix: string): string {
    throw `Use ${commandPrefix}membercount to get a member count`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    const patronRole: Role = parsedUserCommand.originalMessage.guild.roles.find(
      role => role.name === 'Patrons'
    );


    const members = parsedUserCommand.originalMessage.guild.members;
    const humanCount = members.filter(member => !member.user.bot).size;
    let patronCount: number;
    if (patronRole) {
      patronCount = members.filter(member => member.roles.has(patronRole.id)).size;
    }
    const botCount = members.filter(member => member.user.bot).size;

    const embed = new RichEmbed()
      .setTitle('Member Count!')
      .addField('Total Members:', members.size)
      .addField('Human count:', humanCount)
      .addField('Patrons:', !patronRole? 0:patronCount)
      .addField('Bot count:', botCount)
      .setFooter(
        "ffxiv-teamcraft",
        "https://ffxivteamcraft.com/assets/logo.png"
      )
      .setColor("#4880b1");;

    parsedUserCommand.originalMessage.channel.send(embed);
  }



  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    const requiredRole: Role = parsedUserCommand.originalMessage.guild.roles.find(
      role => role.name === 'Moderator'
    );
    if (requiredRole) {
      return parsedUserCommand.originalMessage.member.roles.has(
        requiredRole.id
      );
    } else {
      console.log ('The server does not have the role required for this command.');
      return false;
    }
  }

}
