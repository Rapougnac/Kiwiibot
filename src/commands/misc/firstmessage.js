const  { MessageEmbed, Message } = require("discord.js");
const Client = require('../../struct/Client');
module.exports = {
    name: 'firstmessage',
    aliases: ['fm'],
    description: 'Get the first message in the current channel',
    category: 'misc',
    utilisation: '{prefix}firstmessage',
    cooldown: 10,
    nsfw: false,
    guildOnly: false,
    adminOnly: false,
    ownerOnly: false,
    permissions: [],
    clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    string: [],
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     */
    async execute(client, message, args) {
        const fetchMessages = await message.channel.messages.fetch({ after: 1, limit: 1 });
        const msg = fetchMessages.first();
    
        const embed = new MessageEmbed()
          .setTitle(this.string[0].format(message.channel.name))
          .setURL(msg.url)
          .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
          .setDescription(this.string[1] + msg.content)
          .addField(this.string[2], msg.author, true)
          .addField(this.string[3], msg.id, true)
          .addField(this.string[4], msg.createdAt.toLocaleDateString(), true)
        message.channel.send(embed)
    },
};
