const eco = require("discord-economy");

module.exports = {
	name: 'work',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}work',
	execute(client, message, args) {
		const output =  eco.Work(message.author.id, {
			failurerate: 30,
			money: Math.floor(Math.random() * 500),
			jobs: ['caissier(ière)', 'commerçant(e)', 'strip-teaser(euse)', 'manager', 'barman', 'pornstar']
		});
		//10% chance to fail and earn nothing. You earn between 1-500 coins. And you get one of those 3 random jobs.
		if (output.earned == 0) return message.reply('Ah, malheuruesement tu as mal fait ton travail tu n\'as rien gagné !');

		message.channel.send(`${message.author.username}
	  Tu as travaillé en tant que \` ${output.job} \` et tu as gagné :money_with_wings: ${output.earned}
	  Tu as maintenant :money_with_wings: ${output.balance}`);

	},
};
