const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'uniform',
	aliases: [],
	description: '',
	category: 'nsfw',
	utilisation: '{prefix}uniform',
	async execute(client, message, args) {
		if(message.channel.nsfw){
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some uniforms (Military, Konbini, Work, Nurse Uniforms, etc!~ Sexy~)`)
			.setImage(await akaneko.nsfw.uniform());
		message.channel.send(emebed);
		}else {
			let m = await message.channel.send("**Warning** this command cannot be used in non-nsfw channels!");
			m.delete({ timeout: 10000 })
		}
	},
};
