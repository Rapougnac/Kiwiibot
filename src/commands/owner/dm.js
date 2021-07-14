// const { Client, Message, MessageEmbed } = require('discord.js');

// module.exports = {
//   name: 'dm',
//   aliases: ['mp'],
//   description: "Dm a specific user who's in the guild",
//   category: 'owner',
//   utilisation: '{prefix}dm',
//   cooldown: 5,
//   nsfw: false,
//   ownerOnly: true,
//   adminOnly: false,
//   guildOnly: false,
//   permissions: [],
//   clientPermissions: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
//   string: [],
//   /**
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   async execute(client, message, args) {
//     const user =
//       message.mentions.users.first() ||
//       message.guild.members.cache.get(args[0])?.user;

//     const str = args.slice(1).join(' ');
//     if (!user) return message.channel.send(this.config.string[0]);
//     try {
//       if (message.content.includes('-a')) {
//         user.send(str.replace(/-a/g, ''));
//       } else {
//         user.send(`${message.author.tag}: ${str}`);
//       }
//     } catch (e) {
//       message.channel.send('Erreur' + e);
//     }
//   },
// };
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class DMCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'dm',
      aliases: ['mp'],
      description: 'Yay',
      category: 'owner',
      cooldown: 5,
      utilisation: '{prefix}dm [message] <-a>',
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0])?.user;

    const str = args.slice(1).join(' ');
    if (!user) return message.channel.send(message.guild.i18n.__mf("dm.mention"));
    try {
      if (message.content.includes('-a')) {
        user.send(str.replace(/-a/g, ''));
      } else {
        user.send(`${message.author.tag}: ${str}`);
      }
    } catch (e) {
      //this.client.owners[0]
      const owner = this.client.users.fetch(this.client.owners[0]);
      owner.send('Erreur ' + e)
    }
  }
};
