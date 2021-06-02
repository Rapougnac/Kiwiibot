const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'zetai',
	aliases: [],
	description: '',
	category: 'nsfw',
	utilisation: '{prefix}zetai',
	async execute(client, message, args) {
		if(message.channel.nsfw){
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some zettaiRyouiki (That one part of the flesh being squeeze in thigh-highs~<3)`)
			.setImage(await akaneko.nsfw.zettaiRyouiki());
		message.channel.send(emebed);
		}else {
			let m = await message.channel.send("**Warning** this command cannot be used in non-nsfw channels!");
			m.delete({ timeout: 10000 })
		}
	},
};
