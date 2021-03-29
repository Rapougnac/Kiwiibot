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
	async execute(client,message,args) {
		const msg = await message.channel.send(`🏓 Pinging....`); 
		const ping = Math.round(msg.createdTimestamp - message.createdTimestamp);
        //editing it to the actual latency
        msg.edit(stripIndents`🏓 Po${''.repeat(Math.min(Math.round(ping / 100), 1500))}ng! \n Ping is \`${formatNumber(ping)}ms\` \n Heartbeat: \`${formatNumber(Math.round(client.ws.ping))}ms\``);
	},
};
