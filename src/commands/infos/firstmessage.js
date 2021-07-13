// const  { MessageEmbed, Message } = require("discord.js");
// const Client = require('../../struct/Client');
// module.exports = {
//     name: 'firstmessage',
//     aliases: ['fm'],
//     description: 'Get the first message in the current channel',
//     category: 'misc',
//     utilisation: '{prefix}firstmessage',
//     cooldown: 10,
//     nsfw: false,
//     guildOnly: false,
//     adminOnly: false,
//     ownerOnly: false,
//     permissions: [],
//     clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
//     string: [],
//     /**
//      * @param {Client} client
//      * @param {Message} message
//      * @param {String} args
//      */
//     async execute(client, message, args) {
//         const fetchMessages = await message.channel.messages.fetch({ after: 1, limit: 1 });
//         const msg = fetchMessages.first();

//         const embed = new MessageEmbed()
//           .setTitle(this.config.string[0].format(message.channel.name))
//           .setURL(msg.url)
//           .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
//           .setDescription(this.config.string[1] + msg.content)
//           .addField(this.config.string[2], msg.author, true)
//           .addField(this.config.string[3], msg.id, true)
//           .addField(this.config.string[4], msg.createdAt.toLocaleDateString(), true)
//         message.channel.send(embed)
//     },
// };
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class FirstMessageCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'firstmessage',
      aliases: ['fm', 'first-message'],
      description: 'Get the first message of the current channel',
      category: 'infos',
      cooldown: 5,
      utilisation: '{prefix}firstmessage',
      clientPermissions: ['EMBED_LINKS'],
      string: [],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const fetchMessages = await message.channel.messages.fetch({
      after: 1,
      limit: 1,
    });
    const msg = fetchMessages.first();

    const embed = new MessageEmbed()
      .setTitle(this.config.string[0].format(message.channel.name))
      .setURL(msg.url)
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
      .setDescription(this.config.string[1] + msg.content)
      .addField(this.config.string[2], msg.author, true)
      .addField(this.config.string[3], msg.id, true)
      .addField(
        this.config.string[4],
        msg.createdAt.toLocaleDateString(),
        true
      );
    message.channel.send(embed);
  }
};
