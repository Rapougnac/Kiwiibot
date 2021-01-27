const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'netorare',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}netorare',
	execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some netorare (Wow, I won't even question your fetishes.)`)
			.setImage( akaneko.nsfw.netorare());
		message.channel.send(emebed);
	},
};
