const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'girlsologif',
	aliases: [],
	description: '',
	category: 'Nsfw',
	utilisation: '{prefix}girlsologif',
	async execute(client, message, args) {
		const GIF = await neko.nsfw.kuni();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random kuni image`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};

