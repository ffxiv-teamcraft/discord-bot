import {Command} from './command';
import {CommandContext} from '../models/command_context';
import {EmbedBuilder} from 'discord.js';

export class FaqCommand implements Command {
    commandNames = ['faq'];

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}faq and arguements to load a certain faq.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        // This should realistically just be in command_handler.ts to provide args support for all commands but I have no idea how to do that so here we are.
        const args = parsedUserCommand.originalMessage.content.slice(2).split(/ +/);
        const embed = new EmbedBuilder();

        // This is gross don't @me though it's functional
        switch (args[1]) {
            case 'melding':
                embed
                    .setTitle('Melding Guides')
                    .setDescription('Melding guides cover how best to gear at endgame, what materia to meld and what choices you should make when it comes to gearing.')
                    .addFields({
                        name: 'Crafting',
                        value: 'Crafting meld guides can be found [here.](https://guides.ffxivteamcraft.com/guide/crafting-melding-guide)'
                    })
                    .addFields({
                        name: 'Gathering',
                        value: 'Gathering meld guides can be found [here.](https://guides.ffxivteamcraft.com/guide/gathering-melding-guide)'
                    })
                    .setFooter({
                        text: "ffxiv-teamcraft",
                        iconURL: "https://ffxivteamcraft.com/assets/logo.png"
                    })
                await parsedUserCommand.originalMessage.reply({embeds: [embed]});
                break;

            case 'leveling':
                embed
                    .setTitle('Leveling Guides')
                    .setDescription('This guide will explain how to efficiently level your Crafting and Gathering classes.')
                    .addFields({
                        name: 'Crafting',
                        value: 'Crafting leveling guides can be found [here.](https://guides.ffxivteamcraft.com/guide/crafting-leveling-guide)'
                    })
                    .addFields({
                        name: 'Gathering',
                        value: 'Gathering leveling guides can be found [here.](https://guides.ffxivteamcraft.com/guide/gathering-leveling-guide)'
                    })
                    .setFooter({
                        text: "ffxiv-teamcraft",
                        iconURL: "https://ffxivteamcraft.com/assets/logo.png"
                    })
                await parsedUserCommand.originalMessage.reply({embeds: [embed]});
                break;

            case 'rotations':
                embed
                    .setTitle('Rotation Guides')
                    .setDescription(
                        'Rotation guides tailored towards the gearsets and melds provided in the melding guides.\n\nPlease note that the teamcraft server will not make rotations specifically for you and your stats. Please use <#646093360976625664> and the `!!rotation` command to get assistance with making a rotation or find one that suits your stats in <#454633891018571776>.'
                    )
                    .addFields(
                        {
                            name: 'Crafting',
                            value: 'Crafting rotation guides can be found [here.](https://guides.ffxivteamcraft.com/guide/endgame-crafting-rotations)'
                        },
                        {
                            name: 'Gathering',
                            value: 'Gathering rotation guides can be found [here.](https://guides.ffxivteamcraft.com/guide/gathering-node-rotations)'
                        })
                    .setFooter({
                        text: "ffxiv-teamcraft",
                        iconURL: "https://ffxivteamcraft.com/assets/logo.png"
                    })
                await parsedUserCommand.originalMessage.reply({embeds: [embed]});
                break;

            default:
                await parsedUserCommand.originalMessage.reply('Invalid Argument, Try `rotations`, `leveling`, or `melding`.');
        }
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}
