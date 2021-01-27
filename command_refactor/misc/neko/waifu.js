const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'waifu',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}waifu',
	execute(client, message, args) {
		const GIF = await neko.sfw.waifu();
		const embed = new Discord.MessageEmbed()
		  .setColor('#202225')
		  .setTitle(`${message.author.tag} here's a random waifu image`)
		  .setImage(GIF.url)
		message.channel.send(embed);
	},
};

