const { stripIndents } = require('common-tags');
function formatNumber(number, minimumFractionDigits = 0) {
	return Number.parseFloat(number).toLocaleString(undefined, {
		minimumFractionDigits,
		maximumFractionDigits: 2
	});
}
const { Message, MessageEmbed } = require("discord.js");
const Client = require("../../struct/Client")

module.exports = {
    name: 'ping',
    aliases: ['p'],
	description: 'Ping!',
	category: 'Infos',
	cooldown: 5,
	utilisation: '{prefix}ping',
	nsfw: false,
	ownerOnly: false,
	guildOnly: false,
	adminOnly: false,
	permissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
	clientPermissions: [],
	string: [],
	/**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
	async execute(client,message,args) {
        message.channel.startTyping();
		const msg = await message.channel.send(`🏓 Pinging....`);
		const ping = /*Math.round*/(msg.createdTimestamp - message.createdTimestamp);
		const string = this.string[0].format(ping, formatNumber((client.ws.ping)));
        //editing it to the actual latency
        msg.edit(stripIndents`${string}`);
		message.channel.stopTyping();
	},
};
