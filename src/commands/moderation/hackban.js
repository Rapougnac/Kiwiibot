// const { MessageEmbed, Client, Message } = require("discord.js");
// module.exports = {
//     name: 'hackban',
//     aliases: ['hb'],
//     description: 'hackban somebody',
//     category: 'moderation',
//     utilisation: '{prefix}hackban [id] <reason>',
//     ownerOnly: false,
//     guildOnly: true,
//     adminOnly: false,
//     permissions: ["BAN_MEMBERS"],
//     clientPermissions: ["BAN_MEMBERS"],
//     string: [],
//     /**
//      * @param {Client} client
//      * @param {Message} message
//      * @param {String[]} args
//      */
//     async execute(client, message, args) {
//         let userID = args[0];

//         let reason = args.slice(1).join(" ");

//         if (!userID) return message.channel.send(this.config.string[0]);

//         if (isNaN(userID)) return message.channel.send(this.config.string[1]);

//         if (userID === message.author.id) return message.channel.send(this.config.string[2]);

//         if (userID === client.user.id) return message.channel.send(this.config.string[3]);

//         if (!reason) reason = "No reason provided";

//         client.users.fetch(userID).then(async user => {
//             await message.guild.members.ban(user.id, { reason: reason });

//             return message.channel.send(this.config.string[4].format(user.tag));

//         }).catch(error => {
//             return message.channel.send(this.config.string[5].format(error));
//         });

//     },
// };
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class HackBanCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'hackban',
      aliases: ['hb'],
      description: 'Hackban a member',
      category: 'moderation',
      cooldown: 5,
      utilisation: '{prefix}hackban [userid]',
      string: [],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, [userID, ...args]) {
    const { guild } = message;
    let reason = args.slice(1).join(' ');

    if (!userID) return message.channel.send(message.guild.i18n.__mf("hackban.missing_id"));

    if (isNaN(userID)) return message.channel.send(message.guild.i18n.__mf("hackban.wrong_id"));

    if (userID === message.author.id)
      return message.channel.send(message.guild.i18n.__mf("hackban.self_ban"));

    if (userID === client.user.id)
      return message.channel.send(message.guild.i18n.__mf("hackban.wrong_ban"));

    if (!reason) reason = 'No reason provided';

    client.users
      .fetch(userID)
      .then(async (user) => {
        const banList = guild.fetchBans();
        const bannedUser = (await banList).get(user.id);
        if (bannedUser)
          return message.inlineReply(message.guild.i18n.__mf("hackban.already_banned"), {
            allowedMentions: {
              repliedUser: false,
            },
          });
        else {
          await message.guild.members.ban(user.id, { reason: reason });

          return message.channel.send(message.guild.i18n.__mf("hackban.user_banned",{user: user.tag}));
        }
      })
      .catch((error) => {
        return message.channel.send(message.guild.i18n.__mf("hackban.error",{error: error}));
      });
  }
};
