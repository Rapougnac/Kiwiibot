const Discord = require("discord.js");
module.exports = {
    name: 'firstmessage',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}firstmessage',
    execute(client, message, args) {
        const fetchMessages = message.channel.messages.fetch({ after: 1, limit: 1 });
        const msg = fetchMessages.first();
    
        const embed = new Discord.MessageEmbed()
          .setTitle(`First message in ${message.channel.name}`)
          .setURL(msg.url)
          .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`Content ` + msg.content)
          .addField(`Author`, msg.author, true)
          .addField(`Message ID:`, msg.id, true)
          .addField(`Created at:`, msg.createdAt.toLocaleDateString(), true)
        message.channel.send(embed)
    },
};
