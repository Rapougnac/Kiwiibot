const eco = require("discord-economy");

module.exports = {
    name: 'slots',
    aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}slots',
	execute(client,message,args) {
		const amount = args[0] //Coins to gamble

    if (!amount) return message.reply('Specifie le montant que tu veux parier !');

    const output =  eco.FetchBalance(message.author.id);
    if (output.balance < amount) return message.reply('Tu as moins de coins que le montant à transférer !');

    const gamble =  eco.Slots(message.author.id, amount, {
      width: 3,
      height: 1
    }).catch(console.error);
    message.channel.send(gamble.grid);//Grid checks for a 100% match vertical or horizontal.
    message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`);
	},
};
