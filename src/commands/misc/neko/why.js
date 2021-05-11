const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = {
	name: 'why',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}why',
	async execute(client, message, args) {
		const whyTEXT = await neko.sfw.why();
		message.channel.send(whyTEXT.why);
	},
};
