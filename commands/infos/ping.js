const { stripIndents } = require('common-tags');
function formatNumber(number, minimumFractionDigits = 0) {
	return Number.parseFloat(number).toLocaleString(undefined, {
		minimumFractionDigits,
		maximumFractionDigits: 2
	});
}

module.exports = {
    name: 'ping',
    aliases: ['p'],
	description: 'Ping!',
	category: 'Infos',
	cooldown: 5,
	utilisation: '{prefix}ping',
	ownerOnly: false,
	guildOnly: false,
	adminOnly: false,
	string: [],
	async execute(client,message,args) {

		const msg = await message.channel.send(`🏓 Pinging....`);
		const ping = /*Math.round*/(msg.createdTimestamp - message.createdTimestamp);
		const string = this.string[0].format(ping, formatNumber((client.ws.ping)));
        //editing it to the actual latency
        msg.edit(stripIndents`${string}`);
	},
};
