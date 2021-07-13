// module.exports = {
//     name: 'ban',
//     aliases: [],
//     description: 'Ban a person',
//     category: 'moderation',
//     utilisation: '{prefix}ban [mention] <raison>',
//     nsfw: false,
//     guildOnly: true,
//     adminOnly: false,
//     ownerOnly: false,
//     permissions: ['BAN_MEMBERS'],
//     clientPermissions: ['BAN_MEMBERS', 'EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL'],
//     async execute(client, message, args) {
//         const member = message.mentions.members.first();
//         const reason = args.slice(1).join(' ') || 'Aucune raison fournie'

//         if (!member) {
//             return message.channel.send(`\\❌ | ${message.author}, User could not be found! Please ensure the supplied ID is valid. Mention user for more precision on pinpointing user.`);
//         }

//         if (member.id === message.author.id) {
//             return message.channel.send(`\\❌ | ${message.author}, You cannot ban yourself!`);
//         }

//         if (member.id === client.user.id) {
//             return message.channel.send(`\\❌ | ${message.author}, Please don't ban me!`);
//         }

//         if (member.id === message.guild.ownerID) {
//             return message.channel.send(`\\❌ | ${message.author}, You cannot ban a server owner!`);
//         }

//         if (message.member.roles.highest.position < member.roles.highest.position) {
//             return message.channel.send(`\\❌ | ${message.author}, You can't ban that user! He/She has a higher role than yours`)
//         }

//         if (!member.bannable) {
//             return message.channel.send(`\\❌ | ${message.author}, I couldn't ban that user!`);
//         }

//         await message.channel.send(`Are you sure you want to ban **${member.user.tag}**? (y/n)`)

//         const filter = _message => message.author.id === _message.author.id && ['y', 'n', 'yes', 'no'].includes(_message.content.toLowerCase());
//         const options = { max: 1, time: 30000, errors: ['time'] };
//         const proceed = await message.channel.awaitMessages(filter, options)
//             .then(collected => ['y', 'yes'].includes(collected.first().content.toLowerCase()) ? true : false)
//             .catch(() => false);

//         if (!proceed) {
//             return message.channel.send(`\\❌ | ${message.author}, cancelled the ban command!`);
//         }

//         await member.send(`**${message.author.tag}** banned you from ${message.guild.name}!\n**Reason**: ${reason || 'Unspecified.'}`)
//             .catch(() => null);

//         member.ban({ reason: `${reason || 'Unspecified'}` });
//     },
// };
const {
  Message,
  MessageEmbed,
  MessageAttachment,
  User,
  GuildMember,
} = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class BanCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: [],
      description: 'Ban the specified member',
      category: 'moderation',
      cooldown: 5,
      utilisation: '{prefix}ban [member] <reason>',
      guildOnly: true,
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
          r.user.username.toLowerCase().startsWith(args[0].toLowerCase()) ||
          r.user.username.toLowerCase().endsWith(args[0].toLowerCase())
      ) ||
      message.guild.members.cache.find(
        (r) =>
          r.displayName.toLowerCase().startsWith(args[0].toLowerCase()) ||
          r.displayName.toLowerCase().endsWith(args[0].toLowerCase())
      );
    // const banList = await message.guild.fetchBans();
    // const _bannedUser = banList.find((user) => user.id === member.id);
    //if(args[0])
    const guild = message.guild.members.cache.has(args[0]);
    const reason = args.slice(1).join(' ') || 'No reason provided';
    if (!guild) member = await client.users.fetch(args[0]);
    if (!member) {
      return message.channel.send(
        `\\❌ | ${message.author}, User could not be found! Please ensure the supplied ID is valid. Mention user for more precision on pinpointing user.`
      );
    }

    if (member.id === message.author.id) {
      return message.channel.send(
        `\\❌ | ${message.author}, You cannot ban yourself!`
      );
    }

    if (member.id === client.user.id) {
      return message.channel.send(
        `\\❌ | ${message.author}, Please don't ban me!`
      );
    }

    if (member.id === message.guild.ownerID) {
      return message.channel.send(
        `\\❌ | ${message.author}, You cannot ban a server owner!`
      );
    }
    if (guild) {
      if (
        message.member.roles.highest.position < member.roles.highest.position
      ) {
        return message.channel.send(
          `\\❌ | ${message.author}, You can't ban that user! He/She has a higher role than yours`
        );
      }
    }
    if (guild) {
      if (!member.bannable) {
        return message.channel.send(
          `\\❌ | ${message.author}, I couldn't ban that user!`
        );
      }
    }
    if (member instanceof GuildMember) {
      await message.channel.send(
        `Are you sure you want to ban **${member.user.tag}**? (y/n)`
      );
    } else if (member instanceof User) {
      await message.channel.send(
        `Are you sure you want to ban **${member.tag}**? (y/n)`
      );
    }

    const filter = (_message) =>
      message.author.id === _message.author.id &&
      ['y', 'n', 'yes', 'no'].includes(_message.content.toLowerCase());
    const options = { max: 1, time: 30000, errors: ['time'] };
    const proceed = await message.channel
      .awaitMessages(filter, options)
      .then((collected) =>
        ['y', 'yes'].includes(collected.first().content.toLowerCase())
          ? true
          : false
      )
      .catch(() => false);

    if (!proceed) {
      return message.channel.send(
        `\\❌ | ${message.author}, cancelled the ban command!`
      );
    }
    if (member instanceof GuildMember) {
      await member
        .send(
          `**${message.author.tag}** banned you from ${message.guild.name}!\n**Reason**: ${reason}`
        )
        .catch(() => null);
    }
    if (member instanceof GuildMember) {
      member.ban({ reason: reason });
    } else if (member instanceof User) {
      message.guild.members.ban(member.id, { reason: reason });
    } else {
      return message.inlineReply("I couldn't ban this user!");
    }
  }
};
