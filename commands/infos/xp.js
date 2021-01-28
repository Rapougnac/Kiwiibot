const Discord = require("discord.js");

module.exports = {
	name: 'xp',
	aliases: [],
	description: '',
	category: 'Infos',
	utilisation: '{prefix}xp',
	async execute(client, message, args) {
		let msgauthor = message.author.id
		var xp = client.db_xp.get("xp").filter({ user: msgauthor }).find("xp").value();
		var xpfinal = Object.values(xp);
		const embed2 = new Discord.MessageEmbed()
			.setColor('#F4D03F')
			.setTitle(`Stat des XP de : ${message.author.username}`)
			.setFooter("Enjoy :p")
			.addField("XP", `${xpfinal[1]} xp`)
		message.channel.send(embed2);
	},
};
