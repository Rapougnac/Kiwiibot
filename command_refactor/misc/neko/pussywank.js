const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'pussywank',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}pussywank',
	execute(client, message, args) {
		const GIF = await neko.nsfw.pussyWankGif();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random pussy wank gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};