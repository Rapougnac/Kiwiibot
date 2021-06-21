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
      }
    }
  } else {
    return;
  }
};
