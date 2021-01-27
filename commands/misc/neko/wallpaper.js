const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'wallpaper',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}wallpaper',
	execute(client, message, args) {
		const GIF =  neko.sfw.wallpaper();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random wallpaper`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
