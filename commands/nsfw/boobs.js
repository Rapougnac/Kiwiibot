const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'boobs',
	aliases: [],
	description: '',
	category: 'Nsfw',
	utilisation: '{prefix}boobs',
	async execute(client, message, args) {
		const GIF = await neko.nsfw.boobs();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random boobs image/gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
