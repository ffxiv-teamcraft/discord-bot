import {ColorResolvable, EmbedBuilder, Message, TextChannel} from "discord.js";
import fetch from "node-fetch";

interface LogLine {
    date: Date,
    content: string,
    level: 'info' | 'error' | 'debug' | 'warning'
}

export class LogFilesHandler {

    async handleMessage(message: Message) {
        if (message.author.bot) {
            return;
        }
        const file = message.attachments.first();
        const response = await fetch(file.url);

        if (!response.ok) {
            return message.channel.send('There was an error with fetching the file:' + response.statusText);
        }
        const userLogsChannel: TextChannel = message.client.channels.cache.find(channel => channel.id === '1087796748396810260') as TextChannel;
        const fullLogRef = await userLogsChannel?.send({
            content: `Log file from ${message.author.toString()} in ${message.channel.toString()}: ${file.name}`,
            files: [file]
        });
        await message.delete();
        const messageRef = await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Gold")
                        .setTitle('<:rd:709831391612764282> Log file analyzer')
                        .addFields(
                            {name: 'User', value: message.author.toString()},
                            {name: 'File type', value: file.name},
                            {name: 'Full log', value: `[${file.name}](${fullLogRef.url})`}
                        )
                        .setDescription('Log file is being parsed, please wait...')
                ]
            }
        );

        const content = await response.text();

        const parsedMainLog = this.parseMainLog(content);

        const diagnosis = this.getMainLogDiagnosis(parsedMainLog);

        let diagnosisColor: ColorResolvable = diagnosis.errors.length === 0 ? 'Green' : 'Red';

        await messageRef.edit(
            {
                embeds: [
                    new EmbedBuilder()
                        .setColor("#4880b1")
                        .setTitle('<:bd:709831391587598417> Log file analyzer')
                        .addFields({name: 'User', value: message.author.toString(), inline: true},
                            {name: 'Version', value: parsedMainLog.appVersion, inline: true},
                            {name: 'File type', value: file.name, inline: true},
                            {name: 'DAT path', value: parsedMainLog.datFilesPath},
                            {name: 'Region', value: parsedMainLog.region, inline: true},
                            {name: 'Github Access', value: parsedMainLog.githubAccess, inline: true},
                            {name: 'Deucalion Status', value: parsedMainLog.deucalionStatus, inline: true},
                            {name: 'Full log', value: `[${file.name}](${fullLogRef.url})`}
                        ),
                    new EmbedBuilder()
                        .setColor(diagnosisColor)
                        .setTitle('Diagnosis')
                        .setDescription(diagnosis.errors.length === 0 ? ':white_check_mark: No errors detected in the log file.' : diagnosis.errors.map(row => ` <:redtick:1087870892790534176> ${row}`).join('\n')),
                    ...(diagnosis.warnings.length > 0 ? [
                        new EmbedBuilder()
                            .setColor('Gold')
                            .setDescription(diagnosis.warnings.map(row => ` :warning: ${row}`).join('\n'))
                    ] : []),
                ]
            }
        )
    }

    getStatusFromLines(lines: LogLine[], level: string, regexp: RegExp, mapper: (content: string) => string, fallback = '???'): string {
        const line = lines.find(line => line.level === level && line.content.match(regexp));
        if (line) {
            return mapper(line.content);
        }
        return fallback;
    }

    parseMainLog(content: string) {
        // Reverse to always parse starting from last message
        const lines = this.getRecentLines(content).sort((a, b) => b.date.getTime() - a.date.getTime());

        const datFilesPath = this.getStatusFromLines(lines, 'info', /^DAT Watcher started on/, content => {
            return this.makeSafe(content.replace('DAT Watcher started on', ''));
        });

        const deucalionStatus = this.getStatusFromLines(lines, 'info', /^DEUCALION: SERVER HELLO/, content => {
            return content.includes('RECV ON') && content.includes('SEND ON') ? 'OK' : '**ERR**';
        });

        const githubAccess = this.getStatusFromLines(lines, 'error', /::443/, () => {
            return '**ERR**'
        }, "OK");

        const region = this.getStatusFromLines(lines, 'info', /^Starting PacketCapture with options:/, content => {
            const json = JSON.parse(content.replace('Starting PacketCapture with options: ', ''));
            return json.region;
        });

        const appVersion = this.getStatusFromLines(lines, 'info', /VERSION:/, content => {
            return content.replace('VERSION: ', '');
        }, '<10.3.15');

        const couldntStartPcapIndex = lines.findIndex(line => line.level === 'error' && line.content.includes(`Couldn't start packet capture`));

        const deucalionError = couldntStartPcapIndex > 0 ? lines[couldntStartPcapIndex - 1]?.content : '';

        return {
            datFilesPath,
            deucalionStatus: deucalionError || deucalionStatus,
            githubAccess,
            region,
            appVersion
        }
    }

    private makeSafe(line: string): string {
        return line.replace(/\\?\\Users\\?\\[^\\]+\\/, '\\Users\\\\<redacted>\\')
    }

    getRecentLines(content: string): LogLine[] {
        const regexp = /\[([^\]]+)]\s\[([^\]]+)]\s*(.*)/gm;
        let match;
        const lines = [];
        while (match = regexp.exec(content)) {
            const [, date, level, content] = match;
            lines.push({
                date: new Date(date),
                level,
                content
            })
        }
        lines.reverse();
        let lastStart = lines.find(l => l.content === 'START')?.date?.getTime() || 0;
        if (!lastStart) {
            //Fallback to DAT file watcher log line
            lastStart = lines.find(l => l.content.includes('DAT Watcher started'))?.date?.getTime() || 0;
        }
        return lines.filter(l => l.date.getTime() >= lastStart);
    }

    private getMainLogDiagnosis(log: { deucalionStatus: string; appVersion: string; githubAccess: string; region: string; datFilesPath: string }): { errors: string[], warnings: string [] } {
        const diagnosis = {
            errors: [],
            warnings: []
        }
        if (log.githubAccess !== 'OK') {
            diagnosis.errors.push('Github access is blocked, if you are playing from China, please make sure your region is set to China in Teamcraft, else check your VPN if you have any.');
        }
        if (log.datFilesPath.includes('OneDrive')) {
            diagnosis.warnings.push(`Make sure your Character data folder is excluded from OneDrive as it's known to create issues in character tracking`);
        }
        if (log.deucalionStatus !== 'OK') {
            switch (log.deucalionStatus) {
                case 'GAME_NOT_RUNNING':
                    diagnosis.errors.push(`Teamcraft's packet capture system tried to start without the game running, make sure to start packet capture with the game running.`);
                    break;
                case 'GAME_RUNNING_AS_ADMIN':
                    diagnosis.errors.push(`Teamcraft cannot inject deucalion in the game process because it's either started as admin or protected by something. Make sure to not start the game as admin or if you do, start Teamcraft as admin too.`);
                    break;
                case 'DLL_NOT_FOUND':
                    diagnosis.errors.push(`It looks like your antivirus deleted deucalion.dll in Teamcraft's files, please add an exclusion for it and install Teamcraft again.`);
                    break;
                default:
                    diagnosis.errors.push(`An unknown error is happening with deucalion, staff members will investigate further.`);
                    break;
            }
        }
        return diagnosis;
    }
}
