import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {MessageEmbed} from "discord.js"

export class ClearSiteDataCommand implements Command {
    commandNames = ["clearsitedata", "clearcache"];

    constructor() {
    }

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}clearsitedata or ${commandPrefix}clearcache to explain how to clear site data or cache for Teamcraft.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const embed = new MessageEmbed()
        .setTitle("Part of Teamcraft's website is failing to load, indicating a problem with old site data or cache")
        .setDescription("Please clear your site data and/or cache")
		.addField("Warning:", "This process will log you out of Teamcraft, so please ensure you know your password to log back in. This process may also delete any offline lists you happen to already have (but if the entire site fails to load, there is likely not much you can do about that).")
        .addField("Clear site data/cookies for ffxivteamcraft.com", "Please **click the lock icon** in your URL bar at the top of your browser (next to ``ffxivteamcraft.com``) and perform a process like one of the following (three common browsers are listed, but processes should be fairly similar across assorted other browsers) to clear your site data for Teamcraft.")
		.addField("Chrome:", "Click ``Site settings``, then click the ``Clear data`` button near the top.")
		.addField("Firefox:", "Click ``Clear cookies and site data...``, then click ``Remove`` in the prompt.")
		.addField("Edge:", "Click ``Cookies``, then click ``ffxivteamcraft.com`` and click the ``Remove`` button.")
		.addField("If clearing site data was not enough to resolve your problem","Please clear your cache as well.")
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
