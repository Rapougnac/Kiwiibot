const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'doujin',
	aliases: [],
	description: '',
	category: 'Nsfw',
	utilisation: '{prefix}doujin',
	async execute(client, message, args) {
		if(message.channel.nsfw){
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some doujin (hanime is better)`)
			.setImage(await akaneko.nsfw.doujin());
		message.channel.send(emebed);
		}else {
			let m = await message.channel.send("**Warning** this command cannot be used in non-nsfw channels!");
		  m.delete({ timeout: 10000 })
		}
	},
};
