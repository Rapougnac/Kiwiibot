const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'gasm',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}gasm',
	execute(client, message, args) {
		const GIF =  neko.nsfw.gasm();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random orgasm image`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
