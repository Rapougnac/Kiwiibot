const { Client, Event, MessageEmbed } = require('../struct/main');
const Command = require('../struct/Command');
const { Message } = require('discord.js');
module.exports = class MessageEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'messageCreate',
    });
  }
  /**
   *
   * @param {Message} message
   * @returns {any}
   */
  execute(message) {
    const { author, guild } = message;
    const { bot } = author;
    let prefix = [
      this.client.prefix,
      message.guild ? message.guild.prefix : null,
      `<@!${this.client.user.id}>`,
    ];
    if (
      (bot && author.id !== this.client.config.discord.id_bot_test) ||
      message.webhookID
    )
      return;
    if (!guild) return;
    if (message.content.match(/n+o+ +u+/gi))
      return message.channel.send('no u');
    if (message.content.match(/\(╯°□°）╯︵ ┻━┻/g))
      return message.channel.send('┻━┻       (゜-゜)');
    // Check prefix
    let index;
    // Find which prefix are used
    for (let i = 0; i < prefix.length; i++) {
      if (message.content.toLowerCase().startsWith(prefix[i])) {
        index = i;
        break;
      }
    }
    if (
      message.content.startsWith(`<@!${this.client.user.id}>`) &&
      message.content.endsWith(`<@!${this.client.user.id}>`) &&
      guild
    )
      return message.inlineReply(
        message.guild.i18n.__mf('MESSAGE_PREFIX.msg', {
          prefix: message.guild.prefix,
        })
      );

    const args = message.content
      .slice(prefix[index]?.length ? prefix[index].length : 0)
      .trim()
      .split(/\s+/g);
    const command = args.shift().toLowerCase();
    if (!this.client.commands.has(command) && !this.client.aliases.has(command))
      return;
    /**
     * @type {Command}
     */
    const command_to_execute =
      this.client.commands.get(command) || this.client.aliases.get(command);
    command_to_execute.setMessage(message);
    const reasons = this.client.utils.checkPermissions(
      message,
      command_to_execute
    );
    if (this.client.isOwner(author)) {
      if (command_to_execute.patterns) {
        for (const pattern of command_to_execute.patterns) {
          if (message.content.match(pattern)) {
            try {
              command_to_execute.execute(this.client, message, args);
            } catch (error) {
              console.error(error);
              message.reply(
                message.guild.i18n.__mf('ERROR_MESSAGE') + error.name
              );
            }
          }
        }
      }
      try {
        command_to_execute.execute(this.client, message, args);
      } catch (error) {
        console.error(error);
        message.reply(message.guild.i18n.__mf('ERROR_MESSAGE') + error.name);
      }
    } else {
      if (command_to_execute.patterns) {
        for (const pattern of command_to_execute.patterns) {
          if (message.content.match(pattern)) {
            try {
              command_to_execute.execute(this.client, message, args);
            } catch (error) {
              console.error(error);
              message.reply(
                message.guild.i18n.__mf('ERROR_MESSAGE') + error.name
              );
            }
          }
        }
      }
      if (!message.content.toLowerCase().startsWith(prefix[index])) return;

      if (reasons.length > 0) {
        const embed = new MessageEmbed()
          .setAuthor(
            message.client.user.tag,
            message.client.user.displayAvatarURL({
              dynamic: true,
              format: 'png',
              size: 2048,
            })
          )
          .setColor('RED')
          .setDescription(
            `\`\`\`diff\n-${message.guild.i18n.__mf(
              'PERMS_MESSAGE.blocked_cmd'
            )}\n\`\`\`\n\n` +
              `\`${message.guild.i18n.__mf(
                'PERMS_MESSAGE.reason'
              )}:\`\n\n${reasons.map((reason) => '• ' + reason).join('\n')}`
          );
        return message.channel.send(embed);
      } else {
        try {
          command_to_execute.execute(this.client, message, args);
        } catch (error) {
          console.error(error);
          message.reply(message.guild.i18n.__mf('ERROR_MESSAGE') + error.name);
        }
      }
    }
  }
};
