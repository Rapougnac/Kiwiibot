const akaneko = require('akaneko');
const Discord = require("discord.js");

async function yourFunctionName() {
	let img = await akaneko.nsfw.maid();
	return img;
}
module.exports = {
	name: 'maid',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}maid',
	execute(client, message, args) {
		akaneko.nsfw.maid().then((img) => {
			const emebed = new Discord.MessageEmbed()
				.setTitle(`${message.author.tag} here some maids (Maids, Maid Uniforms, etc, you know what maids are :3)`)
				.setImage(img);
			message.channel.send(emebed);

		});
	},
};
