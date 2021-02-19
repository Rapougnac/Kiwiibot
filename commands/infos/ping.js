module.exports = {
    name: 'ping',
    aliases: ['p'],
	description: 'Ping!',
	category: 'Infos',
	utilisation: '{prefix}ping',
	async execute(client,message,args) {
		const msg = await message.channel.send(`🏓 Pinging....`); 
        //editing it to the actual latency
        msg.edit(`🏓 Pong! Ping is **${Math.round(client.ws.ping)}ms**`);
	},
};
