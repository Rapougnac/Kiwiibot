const _ = require('lodash');
const { joinArray } = require('../../util/string');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const { clientMap } = require('../../../config');
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
      utilisation: '{prefix}help <command-name>',
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
    const fields = [];
    if (message.channel.nsfw) {
      for (const category of [...client.categories]) {
        fields.push({
          name: `${
            client.commands.filter(
              /**@param {Command} c */ (c) =>
                c.help.category === category && !c.config.hidden
            ).size
              ? _.upperFirst(category.replace(/-/g, ' ')) +
                ' ' +
                '[' +
                client.commands.filter(
                  /**@param {Command} c */ (c) =>
                    c.help.category === category && !c.config.hidden
                ).size +
                ']'
              : ''
          }`,
          value: joinArray(
            [
              ...client.commands
                .filter(
                  /**@param {Command} cmd */ (cmd) =>
                    cmd.help.category === category && !cmd.config.hidden
                )
                .map((value) => `\`${value.help.name}\``),
            ],
            message.guild.i18n.getLocale()
          ),
          inline: false,
        });
      }
    } else {
      for (const category of [...client.categories].remove('nsfw')) {
        fields.push({
          name: `${
            client.commands.filter(
              /**@param {Command} c */ (c) =>
                c.help.category === category && !c.config.hidden
            ).size
              ? _.upperFirst(category.replace(/-/g, ' ')) +
                ' ' +
                '[' +
                client.commands.filter(
                  /**@param {Command} c */ (c) =>
                    c.help.category === category && !c.config.hidden
                ).size +
                ']'
              : ''
          }`,
          value: joinArray(
            [
              ...client.commands
                .filter(
                  /**@param {Command} cmd */ (cmd) =>
                    cmd.help.category === category && !cmd.config.hidden
                )
                .map((value) => `\`${value.help.name}\``),
            ],
            message.guild.i18n.getLocale()
          ),
          inline: false,
        });
      }
    }
    if (
      fields.some(
        (x) => (x.name && x.value) || x.name || x.value === null || ''
      )
    ) {
      for (let i = 0; i < fields.length; i++) {
        if (
          !(
            (fields[i].name && fields[i].value) ||
            fields[i].name ||
            fields[i].value
          )
        ) {
          delete fields[i];
        }
      }
    }
    if (!args[0]) {
      const embed = new MessageEmbed()
        .addFields(fields.sort((a, b) => a.name.localeCompare(b.name)))
        .setColor('ORANGE')
        .setTimestamp()
        .setFooter(
          message.guild.i18n.__mf(`help.cmd_usage`, { prefix: client.prefix })
        );

      message.channel.send(embed);
    } else {
      /**
       * @type {Command}
       */
      const command =
        message.client.commands.get(args.join(' ').toLowerCase()) ||
        message.client.aliases.get(args.join(' ').toLowerCase());
      if (command.config.hidden) {
        return message.channel.send(
          `${client.emotes.error} - ${message.guild.i18n.__mf(
            'help.not_found'
          )}`
        );
      }
      if (command.config.nsfw && !message.channel.nsfw) {
        return message.channel.send(
          `${client.emotes.error} - ${message.guild.i18n.__mf('help.nsfw')}`
        );
      }
      if (!command)
        return message.channel.send(
          `\\${client.emotes.error} - ${message.guild.i18n.__mf(
            'help.not_found'
          )}`
        );

      const description = message.guild.i18n.__mf(
        `${command.help.name}.description`
      );
      await message.channel.send({
        embed: {
          color: 'ORANGE',
          author: { name: message.guild.i18n.__mf('help.title') },
          fields: [
            {
              name: message.guild.i18n.__mf('help.name'),
              value: command.help.name,
              inline: true,
            },
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
              value: command.help.utilisation.replace(
                '{prefix}',
                client.prefix
              ),
              inline: true,
            },
            {
              name: 'Cooldown',
              value: command.config.cooldown
                ? `${command.config.cooldown} ${message.guild.i18n.__mf(
                    'help.seconds'
                  )}`
                : message.guild.i18n.__mf('help.none_cooldown'),
              inline: true,
            },
            {
              name: message.guild.i18n.__mf('help.guild_only'),
              value: command.config.guildOnly
                ? message.guild.i18n.__mf('common.yes')
                : message.guild.i18n.__mf('common.no'),
              inline: true,
            },
            {
              name: message.guild.i18n.__mf('help.admin_only'),
              value: command.config.adminOnly
                ? message.guild.i18n.__mf('common.yes')
                : message.guild.i18n.__mf('common.no'),
              inline: true,
            },
            {
              name: message.guild.i18n.__mf('help.owner_only'),
              value: command.config.ownerOnly
                ? message.guild.i18n.__mf('common.yes')
                : message.guild.i18n.__mf('common.no'),
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
