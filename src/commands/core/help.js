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
          value: joinArray([
            ...client.commands
              .filter(
                /**@param {Command} cmd */ (cmd) =>
                  cmd.help.category === category && !cmd.config.hidden
              )
              .map((value) => `\`${value.help.name}\``),
          ]),
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
          value: joinArray([
            ...client.commands
              .filter(
                /**@param {Command} cmd */ (cmd) =>
                  cmd.help.category === category && !cmd.config.hidden
              )
              .map((value) => `\`${value.help.name}\``),
          ]),
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
        .addFields(fields.sort((A, B) => A.name.localeCompare(B.name)))
        .setColor('ORANGE')
        .setTimestamp()
        .setFooter(
          message.channel.nsfw
            ? this.config.string[18].format(client.prefix)
            : this.config.string[18].format(client.prefix) +
                this.config.string[19]
        );
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
      if (command.config.hidden) {
        return message.channel.send(
          `${client.emotes.error} - ${this.config.string[0]}`
        );
      }
      if(command.config.nsfw && !message.channel.nsfw) {
        return message.channel.send(`${client.emotes.error} - ${this.config.string[20]}`)
      }
      if (!command)
        return message.channel.send(
          `${client.emotes.error} - ${this.config.string[0]}`
        );

      await message.channel.send({
        embed: {
          color: 'ORANGE',
          author: { name: this.config.string[1] },
          fields: [
            {
              name: this.config.string[2],
              value: command.help.name,
              inline: true,
            },
            {
              name: this.config.string[3],
              value: _.upperFirst(command.help.category),
              inline: true,
            },
            {
              name: this.config.string[4],
              value:
                command.config.aliases.length < 1
                  ? this.config.string[5]
                  : command.config.aliases.join('\n'),
              inline: true,
            },
            {
              name: this.config.string[8],
              value: command.help.utilisation.replace(
                '{prefix}',
                client.prefix
              ),
              inline: true,
            },
            {
              name: 'Cooldown',
              value: command.config.cooldown
                ? `${command.config.cooldown} ${this.config.string[7]}`
                : this.config.string[6],
              inline: true,
            },
            {
              name: this.config.string[9],
              value: command.config.guildOnly
                ? this.config.string[15]
                : this.config.string[16],
              inline: true,
            },
            {
              name: this.config.string[10],
              value: command.config.adminOnly
                ? this.config.string[15]
                : this.config.string[16],
              inline: true,
            },
            {
              name: this.config.string[11],
              value: command.config.ownerOnly
                ? this.config.string[15]
                : this.config.string[16],
              inline: true,
            },
            {
              name: this.config.string[12],
              value:
                command.config.permissions.length === 0
                  ? this.config.string[17]
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
              name: this.config.string[13],
              value:
                command.config.clientPermissions.length === 0
                  ? this.config.string[17]
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
            {
              name: 'Description',
              value: command.help.description,
              inline: false,
            },
          ],
          timestamp: new Date(),
          description: this.config.string[14],
        },
      });
    }
  }
};
