const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'futanari',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}futanari',
	execute(client, message, args) {
		const GIF = await neko.nsfw.futanari();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random futanari image/gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};