const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'ass',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}ass',
	execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some ass (T H I C C)`)
			.setImage(await akaneko.nsfw.ass());
		message.channel.send(emebed);
	},
};
