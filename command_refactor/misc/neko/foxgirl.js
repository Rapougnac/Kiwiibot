const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'foxgirl',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}foxgirl',
	execute(client, message, args) {
		const GIF =  neko.sfw.foxGirl();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random foxgirl image/gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};

