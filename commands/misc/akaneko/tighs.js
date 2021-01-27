const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'tighs',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}tighs',
	execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some tighs (this is great)`)
			.setImage( akaneko.nsfw.thighs());
		message.channel.send(emebed);
	},
};
