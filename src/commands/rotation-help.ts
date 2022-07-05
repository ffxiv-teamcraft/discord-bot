import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {MessageEmbed} from "discord.js";

export class RotationHelpCommand implements Command {
  commandNames = ["rotation", "rotation-help"];  
  
  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}rotation to get information on what is wanted for help on a rotation`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    const embed = new MessageEmbed()
      .setTitle("How to submit data for rotation help")
      .setDescription("A clear and concise way to get some help on a rotation.")
      .addField("Name of Item", "What are you trying to make?")
      .addField("Curent Level", "What's the level of your crafter making this item?")
      .addField("Stats", "What is the Craftsmanship, Control, and CP?")
      .addField("Current Rotation", "We're looking for a link to TC with the rotation you created already")
      .addField("End Goal", "What's going wrong? What do you want to do with this rotation?")
      .addField("Screenshots", "Please provide any screenshots you can of your rotation. That way, in case the rotation is deleted, future users can still see what you were doing.")
      .setFooter(
        "ffxiv-teamcraft",
        "https://ffxivteamcraft.com/assets/logo.png"
      )
      .setColor("#4880b1");
    await parsedUserCommand.originalMessage.channel.send(embed);
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }

  
}
