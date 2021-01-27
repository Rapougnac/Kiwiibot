const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'panties',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}panties',
	execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some panties`)
			.setImage( akaneko.nsfw.panties());
		message.channel.send(emebed);
	},
};
