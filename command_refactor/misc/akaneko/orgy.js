const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'orgy',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}orgy',
	execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some orgy (An orgy of food sure :))`)
			.setImage(await akaneko.nsfw.orgy());
		message.channel.send(emebed);
	},
};
