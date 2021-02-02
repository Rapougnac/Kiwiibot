const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'masturbation',
	aliases: [],
	description: '',
	category: 'Nsfw',
	utilisation: '{prefix}masturbation',
	async execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some masturbstion (Solo Queue in CSGO!)`)
			.setImage(await akaneko.nsfw.masturbation());
		message.channel.send(emebed);
	},
};
