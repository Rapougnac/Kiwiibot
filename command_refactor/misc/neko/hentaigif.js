const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'hentaigif',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}hentaigif',
	execute(client, message, args) {
		const GIF = await neko.nsfw.randomHentaiGif();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random hentai gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};


