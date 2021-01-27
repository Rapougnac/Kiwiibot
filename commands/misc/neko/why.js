const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'why',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}why',
	execute(client, message, args) {
		const whyTEXT = neko.sfw.why();
		message.channel.send(whyTEXT.why);
	},
};
