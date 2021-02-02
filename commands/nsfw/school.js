const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'school',
	aliases: [],
	description: '',
	category: 'Nsfw',
	utilisation: '{prefix}school',
	async execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some school uniforms :)`)
			.setImage(await akaneko.nsfw.school());
		message.channel.send(emebed);
	},
};
