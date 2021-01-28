const eco = require("discord-economy");

module.exports = {
	name: 'transfer',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}transfer',
	execute(client, message, args) {
		const user = message.mentions.users.first()
		const amount = args[1]

		if (!user) return message.reply('Ping l\'utilisateur a qui tu veux donner de l\'argent !');
		if (!amount) return message.reply('Spécifie le montant que tu vrux lui donner !');

		const output = await eco.FetchBalance(message.author.id);
		if (output.balance < amount) return message.reply('Tu as moins de coins que le montant à transférer !');

		const transfer = await eco.Transfer(message.author.id, user.id, amount);
		message.reply(`Transfert des coins réussi !\nPortefeuille de  ${message.author.tag}: ${transfer.FromUser}\nPortefeuille de ${user.tag}: ${transfer.ToUser}`);
	},
};
