const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'goose',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}goose',
	execute(client, message, args) {
		const GIF = await neko.sfw.goose();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random goose image`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
