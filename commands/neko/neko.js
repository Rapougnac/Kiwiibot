const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'neko',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}neko',
	async execute(client, message, args) {
		const GIF = await neko.sfw.neko();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random neko image`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
