const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'nsfwavatar',
	aliases: [],
	description: '',
	category: 'Nsfw',
	utilisation: '{prefix}nsfwavatar',
	async execute(client, message, args) {
		const GIF = await neko.nsfw.avatar();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random nsfw avatar`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};


