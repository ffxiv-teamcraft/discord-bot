import {Command} from "./command";
import {CommandContext} from "../models/command_context";
import {EmbedBuilder, Role} from "discord.js";
import {InstancesClient, ZoneOperationsClient} from '@google-cloud/compute';
import {google} from "@google-cloud/compute/build/protos/protos";
import IOperation = google.cloud.compute.v1.IOperation;

export class ProfitsApiCommand implements Command {
    instancesClient = new InstancesClient();
    operationsClient = new ZoneOperationsClient();
    private instanceConfig = {
        project: 'ffxivteamcraft',
        zone: 'us-central1-a',
        instance: 'universalis-updater',
    };

    readonly commandNames: string[] = [
        'profits-api',
        'papi'
    ];

    getHelpMessage(commandPrefix: string): string {
        return `Manipulate the profits API, example: \`${commandPrefix}profits-api restart\``;
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        const moderatorRole: Role = parsedUserCommand.originalMessage.guild.roles.cache.find(role => role.name === 'Moderator');
        return parsedUserCommand.authorMember.roles.cache.has(moderatorRole.id);
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        const args = parsedUserCommand.originalMessage.content.slice(2).split(/ +/);
        if (args.includes('restart')) {
            const messageRef = await parsedUserCommand.originalMessage.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Gold")
                            .setTitle('Profits API Updater Restarting')
                            .setDescription('Stopping Profits API Updater...')
                    ]
                }
            );
            await this.stop();
            await messageRef.edit({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Blue")
                        .setTitle('Profits API Updater Starting')
                        .setDescription('Profits API updater Starting...')
                ]
            })
            await this.start();
            await messageRef.edit({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Green")
                        .setTitle('Profits API Updater Restarted')
                        .setDescription('Profits API Updater has been restart')
                ]
            })
        }
    }

    private async stop() {
        const [response] = await this.instancesClient.stop(this.instanceConfig);
        let operation: IOperation = response.latestResponse as IOperation;

        // Wait for the operation to complete.
        while (operation.status !== 'DONE') {
            [operation] = await this.operationsClient.wait({
                operation: operation.name,
                project: this.instanceConfig.project,
                zone: operation.zone.split('/').pop(),
            });
        }
        return true;
    }

    private async start() {
        const [response] = await this.instancesClient.start(this.instanceConfig);
        let operation: IOperation = response.latestResponse as IOperation;

        // Wait for the operation to complete.
        while (operation.status !== 'DONE') {
            [operation] = await this.operationsClient.wait({
                operation: operation.name,
                project: this.instanceConfig.project,
                zone: operation.zone.split('/').pop(),
            });
        }
        return true;
    }

}
