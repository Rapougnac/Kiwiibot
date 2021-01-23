module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(client,message,args) {
		message.channel.send(`🏓Pong : **${client.ws.ping}ms** !`);
	},
};
