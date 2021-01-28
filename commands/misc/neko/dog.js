const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'dog',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}dog',
	async execute(client, message, args) {
		const GIF = await neko.sfw.woof();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random dog image/gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
