import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js";

export class RotationHelpCommand implements Command {
    commandNames = ["rotation", "rotation-help", "rotation-assistance"];

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}rotation to get information on what is wanted for help on a rotation`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("How to submit data for rotation help")
            .setDescription("A clear and concise way to get some help on a crafting rotation.")
            .addFields([
                {
					name: "Name of Item",
					value: "What are you trying to make?"
				},
                {
					name: "Current Level",
					value: "What's the level of your crafter making this item?"
				},
                {
					name: "Stats",
					value: "What are your Craftsmanship, Control, and CP stats? (For helper convenience, please label the stats rather than just posting raw numbers.)"
				},
                {
                    name: "Current Rotation",
                    value: "We're looking for a link to TC with a rotation you already attempted. We do not typically simply answer vague questions like \"Does anybody have a rotation for X?\" Please try SOMETHING first!"
                },
                {
					name: "End Goal",
					value: "What's going wrong? What do you want to do with this rotation?"
				},
                {
                    name: "Screenshots and Links",
                    value: "Please provide any links and/or screenshots you can of your rotation. Screenshots can be handy because in case you delete the rotation in the future, future users can still see what you were doing."
                },
				{
                    name: "Appropriate Channel",
                    value: "We prefer this topic be discussed in <#646093360976625664>, so please post your request for help there to receive help swiftly and efficiently!"
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
