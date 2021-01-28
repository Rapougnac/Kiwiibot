const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'tentacles',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}tentacles',
	async execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some tentacles (I don't judge you but...)`)
			.setImage(await akaneko.nsfw.tentacles());
		message.channel.send(emebed);
	},
};
