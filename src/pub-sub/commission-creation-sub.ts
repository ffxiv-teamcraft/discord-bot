import {PubSub} from '@google-cloud/pubsub';
import {Client, MessageEmbed, TextChannel} from 'discord.js'
import fetch from 'node-fetch';

export class CommissionCreationSub {

    private static CHANNELS: Record<string, string> = {
        elemental: '782287155376291860',
        mana: '782287221545631745',
        gaia: '782287171004006431',
        aether: '782287040737050635',
        primal: '782287253098856469',
        crystal: '782287132945285120',
        chaos: '782214649281642496',
        light: '782287186585452596',
        猫小胖: '782287293712302081',
        莫古力: '782287319221796865',
        陆行鸟: '782287342563098646'
    }

    constructor(private client: Client) {
    }

    public async start() {
        const itemNames = await fetch('https://raw.githubusercontent.com/ffxiv-teamcraft/ffxiv-teamcraft/staging/apps/client/src/assets/data/items.json')
            .then(res => res.json())
        const pubsub = new PubSub({projectId: 'ffxiv-teamcraft'});
        const subscription = await pubsub.topic('commissions-created').subscription('bot');
        subscription.on('message', (message) => {
            message.ack();
            const commission = JSON.parse(message.data.toString());
            const channel: TextChannel = this.client.channels.cache.get(CommissionCreationSub.CHANNELS[commission.datacenter.toLowerCase()]) as TextChannel;
            if (channel) {
                let price = commission.price;
                if (price <= 0) {
                    price = 'To be discussed';
                } else {
                    price = price.toLocaleString('en-US');
                }
                const embed = new MessageEmbed()
                    .setTitle(commission.name)
                    .setURL(`https://ffxivteamcraft.com/commission/${commission.$key}`)
                    .addField('Server', commission.server, true)
                    .addField('Price', price, true)
                    .addField('Has all materials', commission.includesMaterials, true)
                    .addField('Tags', commission.tags.join(', '), true)
                    .addField('Items', commission.items
                        .map(item => ({...item, name: itemNames[item.id]}))
                        .filter(item => item.amount - item.done > 0 && item.name !== undefined)
                        .map(item => ` - **${item.name.en}** x${item.amount - item.done}`)
                    )
                    .setFooter(
                        "ffxiv-teamcraft",
                        "https://ffxivteamcraft.com/assets/logo.png"
                    )
                    .setColor("#4880b1");
                channel.send(embed);
            }
        })
    }

}
