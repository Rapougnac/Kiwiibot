const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require("discord.js");

module.exports = {
	name: 'hentai',
	aliases: [],
	description: '',
	category: 'Nsfw',
	utilisation: '{prefix}hentai',
	async execute(client, message, args) {
		if(message.channel.nsfw){
		const GIF = await neko.nsfw.hentai();
		const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random hentai image`)
			.setImage(GIF.url)
		message.channel.send(embed);
		}else {
			let m = await message.channel.send("**Warning** this command cannot be used in non-nsfw channels!");
		  m.delete({ timeout: 10000 })
		}
	},
};
