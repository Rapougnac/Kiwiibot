const _ = require('lodash');
const { joinArray } = require('../../util/string');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class HelpCommand extends Command {
  /**
   *
   * @param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'help',
      aliases: ['h'],
      description: 'Get the help command',
      category: 'core',
      cooldown: 5,
      utilisation: '{prefix}help <commandname>',
      string: [],
      permissions: [],
      clientPermissions: ['EMBED_LINKS'],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (args.length > 2) return;
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setDescription(
          message.channel.nsfw
            ? `${[...client.categories]
                .map(
                  (val) =>
                    `**${_.upperFirst(val.replace(/-/g, ' '))}** [${
                      client.commands.filter((c) => c.help.category === val)
                        .size
                    }]\n${joinArray([
                      ...client.commands
                        .filter((c) => c.help.category === val)
                        .map((value) => `\`${value.help.name}\``),
                    ],message.guild.i18n.getLocale())}`
                )
                .join('\n\n')}`
            : `${[...client.categories]
                .remove('nsfw')
                .map(
                  (val) =>
                    `**${_.upperFirst(val.replace(/-/g, ' '))}** [${
                      client.commands.filter((c) => c.help.category === val)
                        .size
                    }]\n${joinArray([
                      ...client.commands
                        .filter((c) => c.help.category === val)
                        .map((value) => `\`${value.help.name}\``),
                    ],message.guild.i18n.getLocale())}`
                )
                .join('\n\n')}`
        )
        .setColor('ORANGE')
        .setTimestamp()
        .setFooter(message.guild.i18n.__mf(`help.cmd_usage`,{prefix: client.prefix}));

      message.channel.send(embed);
    } else {
      /**
       * @type {Command}
       */
      const command =
        message.client.commands.get(args.join(' ').toLowerCase()) ||
        message.client.commands.find(
          (x) => x.aliases && x.aliases.includes(args.join(' ').toLowerCase())
        );

      if (!command)
        return message.channel.send(
          `\\${client.emotes.error} - ${message.guild.i18n.__mf('help.not_found')}`
        );

      const description = message.guild.i18n.__mf(`${command.help.name}.description`);
      await message.channel.send({
        embed: {
          color: 'ORANGE',
          author: { name: message.guild.i18n.__mf('help.title')},
          fields: [
            { name: message.guild.i18n.__mf('help.name'), value: command.help.name, inline: true },
            {
              name: message.guild.i18n.__mf('help.category'),
              value: _.upperFirst(command.help.category),
              inline: true,
            },
            {
              name: message.guild.i18n.__mf('help.alias'),
              value:
                command.config.aliases.length < 1
                  ? message.guild.i18n.__mf('help.none_alias')
                  : command.config.aliases.join('\n'),
              inline: true,
            },
            {
              name: message.guild.i18n.__mf('help.usage'),
              value: command.help.utilisation.replace('{prefix}', client.prefix),
              inline: true,
            },
            {
              name: 'Cooldown',
              value: command.config.cooldown
                ? `${command.config.cooldown} ${message.guild.i18n.__mf('help.seconds')}`
                : message.guild.i18n.__mf('help.none_cooldown'),
              inline: true,
            },
            {
              name: message.guild.i18n.__mf('help.guild_only'),
              value: command.config.guildOnly
                ? message.guild.i18n.__mf('help.yes')
                : message.guild.i18n.__mf('help.no'),
              inline: true,
            },
            {
              name: message.guild.i18n.__mf('help.admin_only'),
              value: command.config.adminOnly
                ? message.guild.i18n.__mf('help.yes')
                : message.guild.i18n.__mf('help.no'),
              inline: true,
            },
            {
              name: message.guild.i18n.__mf('help.owner_only'),
              value: command.config.ownerOnly
                ? message.guild.i18n.__mf('help.yes')
                : message.guild.i18n.__mf('help.no'),
              inline: true,
            },
            {
              name: message.guild.i18n.__mf('help.user_permissions'),
              value:
                command.config.permissions.length === 0
                  ? message.guild.i18n.__mf('help.no_permissions')
                  : command.config.permissions.map((x) =>
                      x
                        .toLowerCase()
                        .replace(/(^|"|_)(\S)/g, (z) => z.toUpperCase())
                        .replace(/_/g, ' ')
                        .replace(/Use Vad/g, 'Use Voice Activity')
                        .replace(/Guild/g, 'Server')
                    ),
              inline: true,
            },
            {
              name: message.guild.i18n.__mf('help.bot_permissions'),
              value:
                command.config.clientPermissions.length === 0
                  ? message.guild.i18n.__mf('help.no_permissions')
                  : command.config.clientPermissions.map((x) =>
                      x
                        .toLowerCase()
                        .replace(/(^|"|_)(\S)/g, (z) => z.toUpperCase())
                        .replace(/_/g, ' ')
                        .replace(/Use Vad/g, 'Use Voice Activity')
                        .replace(/Guild/g, 'Server')
                    ),
              inline: true,
            },
            { name: 'Description', value: description, inline: false },
          ],
          timestamp: new Date(),
          description: message.guild.i18n.__mf('help.information'),
        },
      });
    }
  }
};
