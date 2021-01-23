module.exports = {
    name: 'ping',
    aliases: ['p'],
	description: 'Ping!',
	execute(client,message,args) {
		message.channel.send(`🏓Pong : **${client.ws.ping}ms** !`);
	},
};
