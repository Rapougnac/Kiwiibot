const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'nsfwnekogif',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}nsfwnekogif',
	execute(client, message, args) {
		const GIF = await neko.nsfw.nekoGif();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random nsfw neko gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};

