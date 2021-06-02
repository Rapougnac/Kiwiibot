const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'uglybastard',
	aliases: ['ub'],
	description: '',
	category: 'nsfw',
	utilisation: '{prefix}ugly bastard',
	async execute(client, message, args) {
		if(message.channel.nsfw){

		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some ugly bastard (WHYYYY ????)`)
			.setImage(await akaneko.nsfw.uglyBastard());
		message.channel.send(emebed);
		}else {
			let m = await message.channel.send("**Warning** this command cannot be used in non-nsfw channels!");
            m.delete({ timeout: 10000 })
		}
	},
};
