const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'ub',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}ub',
	async execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some ugly bastard (WHYYYY ????)`)
			.setImage(await akaneko.nsfw.uglyBastard());
		message.channel.send(emebed);
	},
};
