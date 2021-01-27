const eco = require("discord-economy");

module.exports = {
    name: 'balance',
    aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}balance',
	execute(client,message,args) {
		let output = eco.FetchBalance(message.author.id);
		message.channel.send(`Hey ${message.author.tag}! Tu as actuellement ${output.balance} coins.`);
	},
};
