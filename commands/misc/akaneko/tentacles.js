const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'tentacles',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}tentacles',
	execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some tentacles (I don't judge you but...)`)
			.setImage( akaneko.nsfw.tentacles());
		message.channel.send(emebed);
	},
};