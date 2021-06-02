const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = {
	name: 'cattext',
	aliases: [],
	description: '',
	category: 'misc',
	utilisation: '{prefix}cattext',
	async execute(client, message, args) {
		const catTEXT = await neko.sfw.catText();
		message.channel.send(catTEXT.cat);
	},
};

