const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'cattext',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}cattext',
	async execute(client, message, args) {
		const catTEXT = await neko.sfw.catText();
		message.channel.send(catTEXT.cat);
	},
};

