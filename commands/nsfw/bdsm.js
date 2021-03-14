const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'bdsm',
	aliases: [],
	description: '',
	category: 'Nsfw',
	utilisation: '{prefix}bdsm',
	async execute(client, message, args) {
		if(message.channel.nsfw){
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some bdsm (I will leave you with your weird delusions)`)
			.setImage(await akaneko.nsfw.bdsm());
		message.channel.send(emebed);
		}else {
			let m = await message.channel.send("**Warning** this command cannot be used in non-nsfw channels!");
		  m.delete({ timeout: 10000 })
		}
	},
};
