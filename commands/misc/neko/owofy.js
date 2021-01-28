const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'owofy',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}owofy',
	async execute(client, message, args) {
		const owoTEXT = await neko.sfw.OwOify({ text: message.content.split(' ').slice(1).join(' ') });
		message.channel.send(owoTEXT.owo);
	},
};

