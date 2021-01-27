const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'bdsm',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}bdsm',
	execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some bdsm (I will leave you with your weird delusions)`)
			.setImage(await akaneko.nsfw.bdsm());
		message.channel.send(emebed);
	},
};
