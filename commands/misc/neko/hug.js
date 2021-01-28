const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'hug',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}hug',
	async execute(client, message, args) {
		if (message.mentions.members.size === 0) {
			const GIF = await neko.sfw.hug();
			const embed = new Discord.MessageEmbed()
				.setColor('#202225')
				.setTitle(`${message.author.tag} hugged themselves`)
				.setImage(GIF.url)
			message.channel.send(embed);
		}
		const member = message.mentions.members.first();
		const GIF =await  neko.sfw.hug();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} hugged ${member.user.tag}`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};

