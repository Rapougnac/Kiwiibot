const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'doujin',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}doujin',
	execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some doujin (hanime is better)`)
			.setImage( akaneko.nsfw.doujin());
		message.channel.send(emebed);
	},
};
