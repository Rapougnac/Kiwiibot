const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'girlsolo',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}girlsolo',
	async execute(client, message, args) {
		const GIF = await neko.nsfw.girlSolo();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random solo girl image`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};

