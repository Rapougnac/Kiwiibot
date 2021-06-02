const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = {
	name: 'spoiler',
	aliases: [],
	description: '',
	category: 'misc',
	utilisation: '{prefix}spoiler',
	async execute(client, message, args) {
		const spoilerTEXT = await neko.sfw.spoiler({ text: message.content.split(' ').slice(1).join(' ') });
		message.channel.send(spoilerTEXT.owo);
	},
};
