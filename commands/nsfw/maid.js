const akaneko = require('akaneko');
const Discord = require("discord.js");

module.exports = {
	name: 'maid',
	aliases: ['maids'],
	description: '(Maids, Maid Uniforms, etc, you know what maids are :3)',
	category: 'Nsfw',
	utilisation: '{prefix}maid',
	async execute(client, message, args) {
		const emebed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} here some maids`)
			.setImage(await akaneko.nsfw.maid());
		message.channel.send(emebed);
	},
};
