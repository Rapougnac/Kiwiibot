const eco = require("discord-economy");

module.exports = {
	name: 'leaderboard',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}leaderboard',
	execute(client, message, args) {
		//If you use discord-economy guild based you can use the filter() function to only allow the database within your guild
		//(message.author.id + message.guild.id) can be your way to store guild based id's
		//filter: x => x.userid.endsWith(message.guild.id)

		//If you put a mention behind the command it searches for the mentioned user in database and tells the position.
		if (message.mentions.users.first()) {

			var output =  eco.Leaderboard({
				filter: x => x.balance > 50,
				search: message.mentions.users.first().id
			})
			message.channel.send(`L'utilisateur ${message.mentions.users.first().tag} est placé ${output} dans le classement !`);

		} else {

			eco.Leaderboard({
				limit: 3, //Only takes top 3 ( Totally Optional )
				filter: x => x.balance > 50 //Only allows people with more than 100 balance ( Totally Optional )
			}).then(async users => { //make sure it is async

				if (users[0]){ let firstplace =  client.user.fetch(users[0].userid)} //Searches for the user object in discord for first place
				if (users[1]){ let secondplace =  client.user.fetch(users[1].userid)} //Searches for the user object in discord for second place
				if (users[2]){ let thirdplace =  client.user.fetch(users[2].userid)} //Searches for the user object in discord for third place

				message.channel.send(`My Global leaderboard:
   
  1 - ${firstplace && firstplace.tag || 'Nobody Yet'} : ${users[0] && users[0].balance || 'None'}
  2 - ${secondplace && secondplace.tag || 'Nobody Yet'} : ${users[1] && users[1].balance || 'None'}
  3 - ${thirdplace && thirdplace.tag || 'Nobody Yet'} : ${users[2] && users[2].balance || 'None'}`);

			});

		}
	},
};
