import { stripIndents } from 'common-tags';
import { Command } from "../../interfaces/Command"
function formatNumber(number, minimumFractionDigits = 0) {
    return Number.parseFloat(number).toLocaleString(undefined, {
        minimumFractionDigits,
        maximumFractionDigits: 2
    });
}
// export const run: Run = async (client, message, args) => {
//     const msg = await message.channel.send(`🏓 Pinging....`);
// 		const ping = /*Math.round*/(msg.createdTimestamp - message.createdTimestamp);
// 		const string = this.string[0].format(ping, formatNumber((client.ws.ping)));
//         //editing it to the actual latency
//     msg.edit(stripIndents`${string}`);
// }

// export const name: string = 'ping';
// export const aliases: string[] = ['p'];
// export const description: string = 'Ping!';
// export const category: string = 'Infos';
// export const cooldown: number = 5;
// export const utilisation: string = '{prefix}ping';
// export const nsfw: boolean = false;
// export const ownerOnly: boolean = false;
// export const guildOnly: boolean = false;
// export const adminOnly: boolean = false;
// export const permissions: string[] = ["SEND_MESSAGES"];
// export const clientPermissions: string[] = [];
// export const string: string[] = [];
// export async function execute(client, message, args) {
// 	const msg = await message.channel.send(`🏓 Pinging....`);
// 	const ping = /*Math.round*/ (msg.createdTimestamp - message.createdTimestamp);
// 	const string = this.string[0].format(ping, formatNumber((client.ws.ping)));
// 	//editing it to the actual latency
// 	msg.edit(stripIndents`${string}`);
// }
export const command: Command = {
    name: "ping",
    aliases: ["p"],
    description: 'Ping!',
    category: 'Infos',
    cooldown: 5,
    utilisation: '{prefix}ping',
    nsfw: false,
    ownerOnly: false,
    guildOnly: false,
    adminOnly: false,
    permissions: ["SEND_MESSAGES"],
    clientPermissions: [],
    string: [],
    async execute(client, message, args) {
        const msg = await message.channel.send(`🏓 Pinging....`);
        const ping = /*Math.round*/(msg.createdTimestamp - message.createdTimestamp);
        const string = this.string[0].format(ping, formatNumber((client.ws.ping)));
        //editing it to the actual latency
        msg.edit(stripIndents`${string}`);
    }
}