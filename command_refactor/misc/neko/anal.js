const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'anal',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}anal',
	execute(client, message, args) {
		const GIF =  neko.nsfw.anal();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random anal image/gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
