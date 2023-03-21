import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js";

export class RotationHelpCommand implements Command {
    commandNames = ["rotation", "rotation-help"];

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}rotation to get information on what is wanted for help on a rotation`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("How to submit data for rotation help")
            .setDescription("A clear and concise way to get some help on a rotation.")
            .addFields([
                {name: "Name of Item", value: "What are you trying to make?"},
                {name: "Curent Level", value: "What's the level of your crafter making this item?"},
                {name: "Stats", value: "What is the Craftsmanship, Control, and CP?"},
                {
                    name: "Current Rotation",
                    value: "We're looking for a link to TC with the rotation you created already"
                },
                {name: "End Goal", value: "What's going wrong? What do you want to do with this rotation?"},
                {
                    name: "Screenshots",
                    value: "Please provide any screenshots you can of your rotation. That way, in case the rotation is deleted, future users can still see what you were doing."
                }
            ])
            
            .setFooter({
                text: "ffxiv-teamcraft",
                iconURL: "https://ffxivteamcraft.com/assets/logo.png"
            })
            .setColor("#4880b1");
        await parsedUserCommand.originalMessage.channel.send({embeds: [embed]});
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }


}
