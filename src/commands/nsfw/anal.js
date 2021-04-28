const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { MessageEmbed } = require("discord.js");
const Message = require("../../struct/Message");

module.exports = {
	name: 'anal',
	aliases: [],
	description: 'Returns a anal image/gif',
	category: 'Nsfw',
	utilisation: '{prefix}anal',
	nsfw: true,
	guildOnly: false,
	adminOnly: true,
	ownerOnly: true,
	permissions: ["MANAGE_MESSAGES"],
	clientPermissions: [],
	/**
	 * 
	 * @param {*} client 
	 * @param {Message} message 
	 * @param {*} args 
	 */
	async execute(client, message, args) {
		const GIF = await neko.nsfw.anal();
		const embed = new MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random anal image/gif`)
			.setImage(GIF.url)
		message.channel.send(embed);
	},
};
