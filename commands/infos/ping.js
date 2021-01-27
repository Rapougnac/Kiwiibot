module.exports = {
    name: 'ping',
    aliases: ['p'],
	description: 'Ping!',
	category: 'Infos',
	utilisation: '{prefix}ping',
	execute(client,message,args) {
		message.channel.send(`🏓Pong : **${client.ws.ping}ms** !`);
	},
};
