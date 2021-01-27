const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'cattext',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}cattext',
	execute(client, message, args) {
		const catTEXT =  neko.sfw.catText();
		message.channel.send(catTEXT.cat);
	},
};

