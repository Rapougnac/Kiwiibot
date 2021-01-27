const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'fact',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}fact',
	execute(client, message, args) {
		const factTEXT =  neko.sfw.fact();
		message.channel.send(factTEXT.fact);
	},
};
