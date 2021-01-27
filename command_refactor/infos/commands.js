const Discord = require("discord.js");

module.exports = {
    name: 'commands',
    aliases: [],
	description: '',
	category: 'Infos',
	utilisation: '{prefix}commands',
	execute(client,message,args) {
		const embed = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setTitle('Safe For Work - Commands')
		.addField(prefix + 'help', 'Returns a help module', true)
		.addField(prefix + 'hug', 'Hug a user', true)
		.addField(prefix + 'kiss', 'Kiss a user', true)
		.addField(prefix + 'pat', 'Pat a user', true)
		.addField(prefix + 'slap', 'Slap a user', true)
		.addField(prefix + 'tickle', 'Tickle a user', true)
		.addField(prefix + 'poke', 'Poke a user', true)
		.addField(prefix + 'cuddle', 'Cuddle a user', true)
		.addField(prefix + 'feed', 'Feed a user', true)
		.addField(prefix + 'cat', 'Returns a cat image/gif', true)
		.addField(prefix + 'dog', 'Returns a dog image/gif', true)
		.addField(prefix + 'goose', 'Returns a goose image', true)
		.addField(prefix + 'smug', 'Returns a smug image/gif', true)
		.addField(prefix + 'baka', 'Returns a baka image/gif', true)
		.addField(prefix + 'neko', 'Returns a neko image', true)
		.addField(prefix + 'nekogif', 'Returns a neko gif', true)
		.addField(prefix + 'lizard', 'Returns a lizard image/gif', true)
		.addField(prefix + 'foxgirl', 'Returns a foxgirl image/gif', true)
		.addField(prefix + 'holo', 'Returns a holo image/gif', true)
		.addField(prefix + 'wallpaper', 'Returns a wallpaper', true)
		.addField(prefix + 'gecg', 'Returns a genetically genetically engineered catgirl image', true)
		.addField(prefix + 'anime avatar', 'Returns an anime avatar', true)
		.addField(prefix + 'waifu', 'Returns a waifu image/gif', true)
		.setFooter("Kiwii est un bot créé et maintenu par Rapougnac#0304")
	  message.channel.send(embed);
	},
};
