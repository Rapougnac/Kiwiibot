const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'uniform',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}uniform',
	execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some uniforms (Military, Konbini, Work, Nurse Uniforms, etc!~ Sexy~)`)
			.setImage( akaneko.nsfw.uniform());
		message.channel.send(emebed);
	},
};