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
	utilisation: '{prefix}ping',
	async execute(client,message,args) {
		//const msg = await message.channel.send(`🏓 Pinging....`); 
        //editing it to the actual latency
        //msg.edit(`🏓 Pong! Ping is **${Math.round(client.ws.ping)}ms**`);
		const msg = await message.say('Pinging...');
		const ping = Math.round(msg.createdTimestamp - message.createdTimestamp);
		return msg.edit(stripIndents`
			🏓 P${'o'.repeat(Math.min(Math.round(ping / 100), 1500))}ng! \`${formatNumber(ping)}ms\`
			Heartbeat: \`${formatNumber(Math.round(this.client.ws.ping))}ms\`
		`);
	},
};
