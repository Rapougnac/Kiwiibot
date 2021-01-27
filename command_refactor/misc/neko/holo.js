const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'holo',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}holo',
	execute(client, message, args) {
		const GIF =  neko.sfw.holo();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random holo image/gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};

