const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'orgy',
	aliases: [],
	description: '',
	category: 'Nsfw',
	utilisation: '{prefix}orgy',
	async sexecute(client, message, args) {
		if(message.channel.nsfw){
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some orgy (An orgy of food sure :))`)
			.setImage(await akaneko.nsfw.orgy());
		message.channel.send(emebed);
		}else {
			let m = await message.channel.send("**Warning** this command cannot be used in non-nsfw channels!");
			m.delete({ timeout: 10000 })
		}
	},
};
