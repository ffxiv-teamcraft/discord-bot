import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder} from "discord.js"

export class BugCommand implements Command {
    commandNames = ["bug", "bug-report", "bugs", "bugreport"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}bug to get information on how to submit a bug report`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("How to submit a bug report for Teamcraft")
            .setDescription("Providing a thorough bug or problem report helps us solve your issues quickly!")
            .addFields([
                {
                    name: "Issue:",
                    value: "A clear and concise description of what the bug is."
                },
                {
                    name: "Steps to reproduce:",
                    value: "A bug that can't be reproduced can't be fixed. Explain in detail, **with numbered steps**, what needs to be done to trigger the issue or bug you are experiencing."
                },
                {
                    name: "Expected Behavior:",
                    value: "A clear and concise description of what you expected to happen."
                },
                {
                    name: "Screenshots:",
                    value: "Please provide any screenshots you can of what is happening. Opening the console via ``CTRL + SHIFT + I`` and clicking the ``Console`` tab is often extremely useful to help us diagnose the issue. Discord allows you to attach multiple screenshots to one post if need be!"
                },
                {
                    name: "Software Version/Type:",
                    value: "Are you using the website or the desktop app? If the app, then which version? If the website, then which browser?"
                },
                {
                    name: "Additional Information:",
                    value: "Any additional context that can help diagnose the issue. The more info, the better!"
                },
                {
                    name: "Bug Template",
                    value: "```**Issue:** \n> \n**Steps to Reproduce:**\n> \n**Expected Behaviour:**\n> \n**Teamcraft Version - Browser / Desktop Client**\n> \n**Additional Information:**\n> \n**Screenshots:**\n\nCopy this and fill next to the > ```"
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
