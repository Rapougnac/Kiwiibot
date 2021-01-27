const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'nsfwneko',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}nsfwneko',
	execute(client, message, args) {
		const GIF = await neko.nsfw.neko();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random nsfw neko image`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};

