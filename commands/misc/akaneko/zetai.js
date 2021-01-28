const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'zetai',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}zetai',
	async execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some zettaiRyouiki (That one part of the flesh being squeeze in thigh-highs~<3)`)
			.setImage(await akaneko.nsfw.zettaiRyouiki());
		message.channel.send(emebed);
	},
};
