const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'gifs',
	aliases: [],
	description: '',
	category: 'Nsfw',
	utilisation: '{prefix}gifs',
	async execute(client, message, args) {
		if(message.channel.nsfw){
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some gifs (Basically an animated image, so yes :3)`)
			.setImage(await akaneko.nsfw.gifs());
		message.channel.send(emebed);
		}else{
			let m = await message.channel.send("**Warning** this command cannot be used in non-nsfw channels!");
		  m.delete({ timeout: 10000 })
		}
	},
};
