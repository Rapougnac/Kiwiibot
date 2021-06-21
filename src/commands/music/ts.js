// const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
// const Client = require('../../struct/Client');

// module.exports = {
//     name: 'rest',
//     aliases: [],
//     description: '',
//     category: 'music',
//     utilisation: '{prefix}rest',
//     cooldown: 5,
//     nsfw: false,
//     ownerOnly: false,
//     adminOnly: false,
//     guildOnly: false,
//     permissions: [],
//     clientPermissions: [],
//     /**
//      * @param {Client} client
//      * @param {Message} message
//      * @param {String[]} args
//      */
//     async execute(client, message, args) {
//         let user = message.mentions.users.first() || message.guild.members.cache.find(r => r.user.username.toLowerCase().startsWith(args.join(' ').toLowerCase())) || message.guild.members.cache.find(r => r.displayName.toLowerCase().startsWith(args.join(' ').toLowerCase())) || message.guild.members.cache.get(args[0]);
//         if(!user) {
//             user = message.author;
//         /**
//          * The name of the RPC
//          * @type {string}
//          */
//         const Spotify = 'Spotify';
//         /**
//          * The type of the RPC
//          * @type {string}
//          */
//         const Type = 'LISTENING';
//         if(user.presence.activities[0].name !== Spotify &&member.userpresence.activities[0].type !== Type) return message.channel.send(`I'm detecting no spotify played to the user ${user.username}`)
//         const embed = new MessageEmbed()
//             .setAuthor(user.tag,member.userdisplayAvatarURL({ format: 'png', size: 512, dynamic: true }))
//             .setTitle(`Activity of ${user.username}`)
//             .setDescription(`Activity:\n\nName: ${user.presence.activities[0].name}\n\nType:${user.presence.activities[0].type}\n\nUrl: ${user.presence.activities[0].url ?member.userpresence.activities[0].url : 'None'}\n\nDetails: ${user.presence.activities[0].details}\n\nBeginned at: ${user.presence.activities[0].createdAt}`)
//             .setThumbnail(user.presence.activities[0].assets.largeImageURL())
//             .addField('Song name',member.userpresence.activities[0].assets.largeText)
//             .addField('Flags',member.userpresence.activities[0].flags)
//             .addField('State',member.userpresence.activities[0].state)
//             .addField('Time',member.userpresence.activities[0].timestamps.start)
//         message.channel.send(embed);
//         } else {
//             user =member.useruser;
//             /**
//              * The name of the RPC
//              * @type {string}
//              */
//             const Spotify = 'Spotify';
//             /**
//              * The type of the RPC
//              * @type {string}
//              */
//             const Type = 'LISTENING';
//             if(user.presence.activities[0].name !== Spotify &&member.userpresence.activities[0].type !== Type) return message.channel.send(`I'm detecting no spotify played to the user ${user.username}`)
//             const embed = new MessageEmbed()
//                 .setAuthor(user.tag,member.userdisplayAvatarURL({ format: 'png', size: 512, dynamic: true }))
//                 .setTitle(`Activity of ${user.username}`)
//                 .setDescription(`Activity:\n\nName: ${user.presence.activities[0].name}\n\nType:${user.presence.activities[0].type}\n\nUrl: ${user.presence.activities[0].url ?member.userpresence.activities[0].url : 'None'}\n\nDetails: ${user.presence.activities[0].details}\n\nBeginned at: ${user.presence.activities[0].createdAt}`)
//                 .setThumbnail(user.presence.activities[0].assets.largeImageURL())
//                 .addField('Song name',member.userpresence.activities[0].assets.largeText)
//                 .addField('Flags',member.userpresence.activities[0].flags)
//                 .addField('State',member.userpresence.activities[0].state)
//                 .addField('Time',member.userpresence.activities[0].timestamps.start)
//             message.channel.send(embed);
//         }
//     },
// };
const moment = require('moment');
require('moment-duration-format');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class SpotifyInfosCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'spotifyinfos',
      aliases: ['spotifyinfo', 'spotinf', 'spi'],
      description: '',
      category: 'music',
      cooldown: 5,
      utilisation: '{prefix}spotifyinfos [member]',
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) =>
          r.user.username
            .toLowerCase()
            .startsWith(args.join(' ').toLowerCase()) ||
          r.user.username.toLowerCase().endsWith(args.join(' ').toLowerCase())
      ) ||
      message.guild.members.cache.find(
        (r) =>
          r.displayName
            .toLowerCase()
            .startsWith(args.join(' ').toLowerCase()) ||
          r.displayName.toLowerCase().endsWith(args.join(' ').toLowerCase())
      );
    if (args.length === 0) member = message.member;
    /**
     * The name of the RPC
     * @type {string}
     */
    const Spotify = 'Spotify';
    /**
     * The type of the RPC
     * @type {string}
     */
    const Type = 'LISTENING';
    if (
      typeof member.user.presence.activities[0] === 'undefined' ||
      (member.user.presence.activities[0].name !== Spotify &&
        member.user.presence.activities[0].type !== Type)
    )
      return message.channel.send(
        `I'm detecting no spotify played to the user ${member.user.username}`
      );
    const embed = new MessageEmbed()
      .setAuthor(
        member.user.tag,
        member.user.displayAvatarURL({
          format: 'png',
          size: 512,
          dynamic: true,
        })
      )
      .setTitle(`Activity of ${member.user.username}`)
      .setThumbnail(member.user.presence.activities[0].assets.largeImageURL())
      .addField('Song Name', member.user.presence.activities[0].name)
      .addField('By', member.user.presence.activities[0].state)
      .addField('On', member.user.presence.activities[0].assets.largeText)
      .addField('Beginned at:', moment(member.user.presence.activities[0].createdAt).format('DD/MM/YYYY HH:MM:SS'));
    message.channel.send(embed);
  }
};