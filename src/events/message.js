const {
    Collection,
    MessageEmbed,
    Message,
    MessageAttachment,
  } = require('discord.js'),
Client = require('../struct/Client'),
Command = require('../struct/Command')
/**
 * @param {Message} message
 * @param {Client} client
 * @param {String[]} args
 */
module.exports = async (client, message) => {
  const { author, guild } = message;
  const { bot } = author;
  let prefix = [client.prefix,message.guild ? message.guild.prefix : null ];
  if(message.channel.type === 'dm'){
    prefix.pop();
  }
  if (bot && author.id !== client.config.discord.id_bot_test) return;
  if (message.content.startsWith(`<@!${client.user.id}>`)) {
    return message.channel.send(message.guild.i18n.__mf("MESSAGE_PREFIX.msg",{prefix: p}));
  }
  if (message.content.match(/n+o+ +u+/gi)) return message.channel.send('no u');
  if (message.content.match(/\(╯°□°）╯︵ ┻━┻/g))
    return message.channel.send('┻━┻       (゜-゜)');
  // Check prefix
  if(!prefix.some(prefix =>message.content.toLocaleLowerCase().startsWith(prefix))) return;
  let index = 0;
  // Find which prefix are used
  for(let i=0;i < prefix.length; i++){
    if(message.content.toLowerCase().startsWith(prefix[i])){
      index = i;
      break;
    }
  }
  const args = message.content.slice(prefix[index].length).trim().split(/\s+/g);
  const command = args.shift().toLowerCase();
  if (!client.commands.has(command) && !client.aliases.has(command)) return;
  /**
   * @type {Command}
   */
  const command_to_execute =
    client.commands.get(command) || client.aliases.get(command);
  command_to_execute.setMessage(message);

  if (command_to_execute) {
    if (client.owners.includes(message.author.id)) {
      if (command_to_execute.config.string) {
        try {
          command_to_execute.execute(client, message, args);
        } catch (error) {
          console.error(error);
          message.reply(message.guild.i18n.__mf("ERROR_MESSAGE") + error.name);
        }
      } else {
        try {
          command_to_execute.execute(client, message, args);
        } catch (error) {
          console.error(error);
          message.reply(message.guild.i18n.__mf("ERROR_MESSAGE") + error.name);
        }
      }
    } else {
      if (command_to_execute.config.string) {
        const reasons = [];
        if (message.channel.type === 'dm') {
          if (command_to_execute.config.guildOnly) {
            reasons.push(message.guild.i18n.__mf("PERMS_MESSAGE.guild_only"));
          }
        }

        if (guild) {
          if (command_to_execute.config.ownerOnly) {
            if (!client.owners.includes(message.author.id)) {
              reasons.push(message.guild.i18n.__mf("PERMS_MESSAGE.dev_only"));
            }
          }
          if (command_to_execute.config.adminOnly) {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
              reasons.push(message.guild.i18n.__mf("PERMS_MESSAGE.admin_only"));
            }
          }
          if (command_to_execute.config.nsfw) {
            if (!message.channel.nsfw) {
              reasons.push(message.guild.i18n.__mf("PERMS_MESSAGE.nsfw"));
            }
          }
          if (Array.isArray(command_to_execute.config.permissions)) {
            if (
              !message.channel
                .permissionsFor(message.member)
                .has(command_to_execute.config.permissions)
            ) {
              reasons.push(
                [
                  message.guild.i18n.__mf("PERMS_MESSAGE.missing_permissions_you"),
                  message.guild.i18n.__mf("PERMS_MESSAGE.missing_permissions1_you"),
                  Object.entries(
                    message.channel.permissionsFor(message.member).serialize()
                  )
                    .filter(
                      (p) =>
                        command_to_execute.config.permissions.includes(p[0]) &&
                        !p[1]
                    )
                    .flatMap((c) =>
                      c[0]
                        .toLowerCase()
                        .replace(/(^|"|_)(\S)/g, (x) => x.toUpperCase())
                        .replace(/_/g, ' ')
                        .replace(/Guild/g, 'Server')
                        .replace(/Use Vad/g, 'Use Voice Activity')
                    )
                    .join('\n\u2000\u2000- '),
                ].join('')
              );
            }
          }
          if (Array.isArray(command_to_execute.config.clientPermissions)) {
            if (
              !message.channel
                .permissionsFor(message.guild.me)
                .has(command_to_execute.config.clientPermissions)
            ) {
              reasons.push(
                [
                  message.guild.i18n.__mf("PERMS_MESSAGE.missing_permissions_i"),
                  message.guild.i18n.__mf("PERMS_MESSAGE.missing_permissions1_i"),
                  Object.entries(
                    message.channel.permissionsFor(message.guild.me).serialize()
                  )
                    .filter(
                      (p) =>
                        command_to_execute.config.clientPermissions.includes(
                          p[0]
                        ) && !p[1]
                    )
                    .flatMap((c) =>
                      c[0]
                        .toLowerCase()
                        .replace(/(^|"|_)(\S)/g, (x) => x.toUpperCase())
                        .replace(/_/g, ' ')
                        .replace(/Guild/g, 'Server')
                        .replace(/Use VAD/g, 'Use Voice Activity')
                    )
                    .join('\n\u2000\u2000- '),
                ].join('')
              );
            }
          }

          if (reasons.length > 0) {
            const embed = new MessageEmbed()
              .setAuthor(
                client.user.tag,
                client.user.displayAvatarURL({
                  dynamic: true,
                  format: 'png',
                  size: 2048,
                })
              )
              .setColor('RED')
              .setDescription(
                `\`\`\`diff\n-${
                  message.guild.i18n.__mf("PERMS_MESSAGE.blocked_cmd")
                }\n\`\`\`\n\n` +
                  `\`${message.guild.i18n.__mf("PERMS_MESSAGE.reason")}:\`\n\n${reasons
                    .map((reason) => '• ' + reason)
                    .join('\n')}`
              );
            return message.channel.send(embed);
          }
        } else {
          if (command_to_execute.config.ownerOnly) {
            if (!client.owners.includes(message.author.id)) {
              reasons.push(message.guild.i18n.__mf("PERMS_MESSAGE.dev_only"));
            }
          }
          if (command_to_execute.config.nsfw) {
            if (!message.channel.nsfw) {
              reasons.push(message.guild.i18n.__mf("PERMS_MESSAGE.nsfw"));
            }
          }
          if (reasons.length > 0) {
            const embed = new MessageEmbed()
              .setAuthor(
                client.user.tag,
                client.user.displayAvatarURL({
                  dynamic: true,
                  format: 'png',
                  size: 2048,
                })
              )
              .setColor('RED')
              .setDescription(
                `\`\`\`diff\n-${
                  message.guild.i18n.__mf("PERMS_MESSAGE.blocked_cmd")
                }\n\`\`\`\n\n` +
                  `\`${message.guild.i18n.__mf("PERMS_MESSAGE.reason")}:\`\n\n${reasons
                    .map((reason) => '• ' + reason)
                    .join('\n')}`
              );
            return message.channel.send(embed);
          }
        }

        try {
          command_to_execute.execute(client, message, args);
        } catch (e) {
          console.error(e);
          message.reply(message.guild.i18n.__mf("ERROR_MESSAGE") + e.name);
        }
      } else {
        try {
          command_to_execute.execute(client, message, args);
        } catch (e) {
          console.error(e);
          message.reply(message.guild.i18n.__mf("ERROR_MESSAGE") + e.name);
        }
      }
      //}
    }
  } else {
    return;
  }
};
