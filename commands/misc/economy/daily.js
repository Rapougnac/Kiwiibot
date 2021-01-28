const eco = require("discord-economy");

module.exports = {
	name: 'daily',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}daily',
	async execute(client, message, args) {
		let output = await eco.Daily(message.author.id);
		//output.updated will tell you if the user already claimed his/her daily yes or no.

		if (output.updated) {
			let profile =  eco.AddToBalance(message.author.id, 100);
			message.reply(`Tu as réclamé ta récompense quotidienne ! Tu as maintenant ${profile.newbalance} coins.`);

		} else {
			message.channel.send(`Désolé mais tu as déjà réclamé ta récompense quotidienne !\nMais ne t'inquiètes pas, il reste encore ${output.timetowait} avant que tu puisses réclamer ta récompense`);
		}
	},
};
