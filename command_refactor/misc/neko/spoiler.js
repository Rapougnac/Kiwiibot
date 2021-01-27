const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'spoiler',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}spoiler',
	execute(client, message, args) {
		const spoilerTEXT = await neko.sfw.spoiler({ text: message.content.split(' ').slice(1).join(' ') });
		message.channel.send(spoilerTEXT.owo);
	},
};
