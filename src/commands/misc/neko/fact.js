const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = {
	name: 'fact',
	aliases: [],
	description: '',
	category: 'misc',
	utilisation: '{prefix}fact',
	async execute(client, message, args) {
		const factTEXT = await neko.sfw.fact();
		message.channel.send(factTEXT.fact);
	},
};
