const Discord = require("discord.js");

module.exports = {
	name: 'commandsnsfw',
	aliases: [],
	description: '',
	category: 'Infos',
	utilisation: '{prefix}commandsnsfw',
	async execute(client, message, args) {
		const embed3 = new Discord.MessageEmbed()
			.setColor('#FFC0CB')
			.setTitle('Not Safe For Work - Commands')
			.addField(prefix + 'pussy', 'Returns a pussy image/gif', true)
			.addField(prefix + 'lesbian', 'Returns a lesbian image/gif', true)
			.addField(prefix + 'cumsluts', 'Returns a cumsluts image/gif', true)
			.addField(prefix + 'boobs', 'Returns a boobs image/gif', true)
			.addField(prefix + 'blowjob', 'Returns a blowjob image/gif', true)
			.addField(prefix + 'anal', 'Returns a anal image/gif', true)
			.addField(prefix + 'trap', 'Returns a trap image/gif', true)
			.addField(prefix + 'tits', 'Returns a tits image/gif', true)
			.addField(prefix + 'spank', 'Returns a spank image/gif', true)
			.addField(prefix + 'cumart', 'Returns a cumart image/gif', true)
			.addField(prefix + 'femdom', 'Returns a femdom image/gif', true)
			.addField(prefix + 'yuri', 'Returns a yuri image/gif', true)
			.addField(prefix + 'nsfwavatar', 'Returns an nsfw avatar', true)
			.addField(prefix + 'hentaigif', 'Returns a hentai gif', true)
			.addField(prefix + 'hentai', 'Returns a hentai image', true)
			.addField(prefix + 'nsfwnekogif', 'Returns a nsfw neko gif', true)
			.addField(prefix + 'nsfwneko', 'Returns a nsfw neko image', true)
			.addField(prefix + 'cuni', 'Returns a cuni image', true)
			.addField(prefix + 'girlsolo', 'Returns a girlsolo image', true)
			.addField(prefix + 'girlsologif', 'Returns a girlsolo gif', true)
			.addField(prefix + 'pussywank', 'Returns a pussywank gif', true)
			.addField(prefix + 'pussyart', 'Returns a pussyart image/gif', true)
			.addField(prefix + 'kitsune', 'Returns a kitsune image/gif', true)
			.addField(prefix + 'futanari', 'Returns a futanari image/gif', true)
			.addField(prefix + 'keta', 'Returns a keta image/gif', true)
			.addField(prefix + 'gasm', 'Returns a gasm image', true)
			.addField(prefix + 'feetgif', 'Returns a feet gif', true)
			.addField(prefix + 'feet', 'Returns a feet image', true)
			.addField(prefix + 'loli', 'chotto mate ! that\'s illegal !', true)
			.addField(prefix + 'panties', 'Returns a pantsu image', true)
			.addField(prefix + 'school', 'Return a hentai image in a school', true)
			.addField(prefix + 'feetgif', 'Returns a feet gif', true)
			.addField(prefix + 'feet', 'Returns a feet image', true)
			.addField(prefix + 'loli', 'chotto mate ! that\'s illegal !', true)
			.addField(prefix + 'panties', 'Returns a pantsu image')
			.addField(prefix + 'school', 'Returns a hentai image in a school', true)
			.addField(prefix + 'tentacles', 'Returns a tentacles image', true)
			.addField(prefix + 'tighs', 'Returs a thighs image', true)
			.addField(prefix + 'ub', 'JUST DON\'T', true)
			.addField(prefix + 'uniform', 'Returns an image w/ girls w/ uniforms', true)
			.addField(prefix + 'zettai', 'Return a image by zettai', true)
			.addField(prefix + 'ass', 'If u need some ass', true)
			.addField(prefix + 'glasses', 'Why not ?', true)
			.addField(prefix + 'bdsm', 'That\'s your fetishes', true)
			.addField(prefix + 'doujin', 'Yeah a random page of a random doujin', true)
			.addField(prefix + 'gifs', 'Hentai but animated :)', true)
			.addField(prefix + 'netorare', 'Well no...', true)
			.addField(prefix + 'maid', 'Y E S  maids', true)
			.addField(prefix + 'masturbation', 'Returns a masturbation image', true)
			.addField(prefix + 'orgy', 'It\'s just an orgy', true)

		const embed2 = new Discord.MessageEmbed()
			.setColor('#FFC0CB')
			.addField(prefix + 'gasm', 'Returns a gasm image', true)
			.addField(prefix + 'feetgif', 'Returns a feet gif', true)
			.addField(prefix + 'feet', 'Returns a feet image', true)
			.addField(prefix + 'loli', 'chotto mate ! that\'s illegal !', true)
			.addField(prefix + 'panties', 'Returns a pantsu image', true)
			.addField(prefix + 'school', 'Return a hentai image in a school', true)
			.addField(prefix + 'feetgif', 'Returns a feet gif', true)
			.addField(prefix + 'feet', 'Returns a feet image', true)
			.addField(prefix + 'loli', 'chotto mate ! that\'s illegal !', true)
			.addField(prefix + 'panties', 'Returns a pantsu image')
			.addField(prefix + 'school', 'Returns a hentai image in a school', true)
			.addField(prefix + 'tentacles', 'Returns a tentacles image', true)
			.addField(prefix + 'tighs', 'Returs a thighs image', true)
			.addField(prefix + 'ub', 'JUST DON\'T', true)
			.addField(prefix + 'uniform', 'Returns an image w/ girls w/ uniforms', true)
			.addField(prefix + 'zettai', 'Return a image by zettai', true)
			.addField(prefix + 'ass', 'If u need some ass', true)
			.addField(prefix + 'glasses', 'Why not ?', true)
			.addField(prefix + 'bdsm', 'That\'s your fetishes', true)
			.addField(prefix + 'doujin', 'Yeah a random page of a random doujin', true)
			.addField(prefix + 'gifs', 'Hentai but animated :)', true)
			.addField(prefix + 'netorare', 'Well no...', true)
			.addField(prefix + 'maid', 'Y E S  maids', true)
			.addField(prefix + 'masturbation', 'Returns a masturbation image', true)
			.addField(prefix + 'orgy', 'It\'s just an orgy', true)
			
			message.channel.send(embed3);
			message.channel.send(embed2);
	},
};
