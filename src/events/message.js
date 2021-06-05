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

  if (!message.content.toLowerCase().startsWith(p)) return;
  const [command, ...args] = message.content
    .toLowerCase()
    .slice(p.length)
    .trim()
    .split(/\s+/g);
  if (!client.commands.has(command) && !client.aliases.has(command)) return;
  /**
   * @type {Command}
   */
  const command_to_execute =
    client.commands.get(command) || client.aliases.get(command);

  if (command_to_execute) {
    if (client.owners.includes(message.author.id)) {
      if (command_to_execute.config.string) {
        command_to_execute.config.string = language(
          guild,
          command_to_execute.help.name
        );
        command_to_execute.setMessage(message);
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
      if (!command_to_execute.promise) {
        return await command_to_execute.checkPerms(
          message,
          command_to_execute,
          language,
          client
        );
      } else {
        if (command_to_execute.config.string) {
          command_to_execute.config.string = language(
            guild,
            command_to_execute.help.name
          );
          command_to_execute.setMessage(message);
          if (command_to_execute.config.cooldown > 0) {
            command_to_execute.startCooldown(
              message.author.id,
              command_to_execute,
            );
            if (command_to_execute.now < command_to_execute.expirationTime) {
              const timeLeft = (command_to_execute.expirationTime - command_to_execute.now) / 1000; //get the lefttime
              return message.inlineReply(
                language(guild, 'COOLDOWN_MESSAGE').format(
                  format(timeLeft),
                  command_to_execute.help.name
                ),
                {
                  allowedMentions: {
                    repliedUser: false,
                  },
                }
              );
            } else {
              try {
                command_to_execute.execute(client, message, args);
              } catch (e) {
                console.error(e);
                message.reply(language(guild, 'ERROR_MESSAGE') + e.name);
              }
            }
          }
          else {
            try {
              command_to_execute.execute(client, message, args);
            } catch (e) {
              console.error(e);
              message.reply(language(guild, 'ERROR_MESSAGE') + e.name);
            }
          }
        } else {
          command_to_execute.setMessage(message);
          if (command_to_execute.config.cooldown > 0) {
            command_to_execute.startCooldown(
              message.author.id,
              command_to_execute,
            );
            if (command_to_execute.now < command_to_execute.expirationTime) {
              const timeLeft = (command_to_execute.expirationTime - command_to_execute.now) / 1000; //get the lefttime
              return message.inlineReply(
                language(guild, 'COOLDOWN_MESSAGE').format(
                  format(timeLeft),
                  command_to_execute.help.name
                ),
                {
                  allowedMentions: {
                    repliedUser: false,
                  },
                }
              );
            } else {
              try {
                command_to_execute.execute(client, message, args);
              } catch (e) {
                console.error(e);
                message.reply(language(guild, 'ERROR_MESSAGE') + e.name);
              }
            }
          }
          else {
            try {
              command_to_execute.execute(client, message, args);
            } catch (e) {
              console.error(e);
              message.reply(language(guild, 'ERROR_MESSAGE') + e.name);
            }
          }
        }
      }
    }
  } else {
    return;
  }
};
const format = (time) => {
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  var ret = '';
  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }
  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return `\`${ret}\``;
};