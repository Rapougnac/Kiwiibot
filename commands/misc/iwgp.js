const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: 'iwgp',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}iwgp',
    execute(client, message, args) {
        //const args = message.content.trim().split(/ +/g);
        let userID = args[1];
        if (!userID) return message.channel.send("Merci de rentrer une id valide");
    
    
        client.users.fetch(userID).then(async user => {
    
    
          fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
            .then(res => res.json())
            .then(json => {
              const roastEmbed = new Discord.MessageEmbed()
                .setTitle(`**${user.tag}** ` + `${json.insult}`)
              message.channel.send(roastEmbed);
            });
    
          //**${user.tag}**
        });
    },
};
