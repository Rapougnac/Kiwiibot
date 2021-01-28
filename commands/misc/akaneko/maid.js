const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'maid',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}maid',
	execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some maids (Maids, Maid Uniforms, etc, you know what maids are :3)`)
			.setImage(await akaneko.nsfw.maid());
		message.channel.send(emebed);
	},
};
