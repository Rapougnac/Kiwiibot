const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'glasses',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}glasses',
	execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some glasses (I'm a bot but I'm horny...)`)
			.setImage(await akaneko.nsfw.glasses());
		message.channel.send(emebed);
	},
};
