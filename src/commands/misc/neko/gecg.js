const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'gecg',
	aliases: [],
	description: '',
	category: 'neko',
	utilisation: '{prefix}gecg',
	async execute(client, message, args) {
		const GIF = await neko.sfw.gecg();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random genetically engineered catgirl image`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
