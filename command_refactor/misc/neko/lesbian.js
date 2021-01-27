const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'lesbian',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}lesbian',
	execute(client, message, args) {
		const GIF = await neko.nsfw.lesbian();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random lesbian image/gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
