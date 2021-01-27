const eco = require("discord-economy");

module.exports = {
    name: 'coinflip',
    aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}coinflip',
	execute(client,message,args) {
		const flip = args[0]; //Heads or Tails
		const amount = args[1]; //Coins to gamble
	
		if (!flip || !['pile', 'face'].includes(flip)) return message.reply('S\'il te plaît choisi entre pile ou face !');
		if (!amount) return message.reply('Specifie le montant que tu veux parier !');
	
		const output =  eco.FetchBalance(message.author.id);
		if (output.balance < amount) return message.reply('Tu as moins de coins que le montant à transférer !');
	
		const gamble =  eco.Coinflip(message.author.id, flip, amount).catch(console.error);
		message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`);
	},
};
