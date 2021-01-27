const eco = require("discord-economy");

module.exports = {
    name: 'dice',
    aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}dice',
	execute(client,message,args) {
		const roll = args[0]; //Should be a number between 1 and 6
		const amount = args[1]; //Coins to gamble
	
		if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Spécifie le nombre, il doit être compris entre 1 et 6');
		if (!amount) return message.reply('Specifie le montant que tu veux parier !');
	
		var output = eco.FetchBalance(message.author.id);
		if (output.balance < amount) return message.reply('Tu as moins de coins que le montant à transférer !');
	
		const gamble =  eco.Dice(message.author.id, roll, amount).catch(console.error);
		message.reply(`The dice rolled ${gamble.dice}. So you ${gamble.output}! New balance: ${gamble.newbalance}`);
	},
};
