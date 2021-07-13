const {
    Collection,
    MessageEmbed,
    Message,
    MessageAttachment,
  } = require('discord.js'),
  Client = require('../struct/Client'),
  Command = require('../struct/Command'),
  { prefix } = require('../util/prefix'),
  { language } = require('../../language'),
  { checkLang } = require('../util/string');
/**
 * @param {Message} message
 * @param {Client} client
 * @param {String[]} args
 */
module.exports = async (client, message) => {
  await checkLang(message);
  const { author, guild } = message;
  const { bot } = author;
  if (bot && author.id !== client.config.discord.id_bot_test) return;
  const p = await prefix(message, client.config);
  if (message.content.startsWith(`<@!${client.user.id}>`)) {
    return message.channel.send(language(guild, 'MESSAGE_PREFIX').format(p));
  }
  if (message.content.match(/n+o+ +u+/gi)) return message.channel.send('no u');
  if (message.content.match(/\(╯°□°）╯︵ ┻━┻/g))
    return message.channel.send('┻━┻       (゜-゜)');
  if (!message.content.toLowerCase().startsWith(p)) return;
  const args = message.content.slice(p.length).trim().split(/\s+/g);
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
        command_to_execute.config.string = language(
          guild,
          command_to_execute.help.name
        );
        try {
          command_to_execute.execute(client, message, args);
        } catch (error) {
          console.error(error);
          message.reply(language(guild, 'ERROR_MESSAGE') + error.name);
        }
      } else {
        try {
          command_to_execute.execute(client, message, args);
        } catch (error) {
          console.error(error);
          message.reply(language(guild, 'ERROR_MESSAGE') + error.name);
        }
      }
    } else {
      if (command_to_execute.config.string) {
        const reasons = [];
        if (message.channel.type === 'dm') {
          if (command_to_execute.config.guildOnly) {
            reasons.push(language(guild, 'PERMS_MESSAGE')[0].join(' - '));
          }
        }

        if (guild) {
          if (command_to_execute.config.ownerOnly) {
            if (!client.owners.includes(message.author.id)) {
              reasons.push(language(guild, 'PERMS_MESSAGE')[1].join(' - '));
            }
          }
          if (command_to_execute.config.adminOnly) {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
              reasons.push(language(guild, 'PERMS_MESSAGE')[2].join(' - '));
            }
          }
          if (command_to_execute.config.nsfw) {
            if (!message.channel.nsfw) {
              reasons.push(language(guild, 'PERMS_MESSAGE')[3].join(' - '));
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
                  language(guild, 'PERMS_MESSAGE')[4][0],
                  language(guild, 'PERMS_MESSAGE')[4][1],
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
                  language(guild, 'PERMS_MESSAGE')[5][0],
                  language(guild, 'PERMS_MESSAGE')[5][1],
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
                  language(guild, 'PERMS_MESSAGE')[6]
                }\n\`\`\`\n\n` +
                  `\`${language(guild, 'PERMS_MESSAGE')[7]}:\`\n\n${reasons
                    .map((reason) => '• ' + reason)
                    .join('\n')}`
              );
            return message.channel.send(embed);
          }
        } else {
          if (command_to_execute.config.ownerOnly) {
            if (!client.owners.includes(message.author.id)) {
              reasons.push(language(guild, 'PERMS_MESSAGE')[1].join(' - '));
            }
          }
          if (command_to_execute.config.nsfw) {
            if (!message.channel.nsfw) {
              reasons.push(language(guild, 'PERMS_MESSAGE')[3].join(' - '));
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
                  language(guild, 'PERMS_MESSAGE')[6]
                }\n\`\`\`\n\n` +
                  `\`${language(guild, 'PERMS_MESSAGE')[7]}:\`\n\n${reasons
                    .map((reason) => '• ' + reason)
                    .join('\n')}`
              );
            return message.channel.send(embed);
          }
        }
        command_to_execute.config.string = language(
          guild,
          command_to_execute.help.name
        );

        try {
          command_to_execute.execute(client, message, args);
        } catch (e) {
          console.error(e);
          message.reply(language(guild, 'ERROR_MESSAGE') + e.name);
        }
      } else {
        try {
          command_to_execute.execute(client, message, args);
        } catch (e) {
          console.error(e);
          message.reply(language(guild, 'ERROR_MESSAGE') + e.name);
        }
      }
      //}
    }
  } else {
    return;
  }
};
