const { MessageEmbed, Message } = require('discord.js');
const Client = require('../../struct/Client');
const _ = require('lodash');
const { joinArray } = require('../../util/string')
module.exports = {
  name: 'help',
  aliases: ['h'],
  category: 'core',
  description: 'Shows the help pannel or the function of a command',
  utilisation: '{prefix}help <command name>',
  cooldown: 10,
  guildOnly: true,
  adminOnly: false,
  ownerOnly: false,
  nsfw: false,
  permissions: [],
  clientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (args.length > 2) return;
    if (!args[0]) {
      // const embed = new MessageEmbed()
      // .setDescription(
      //   `${[...client.categories].map(
      //     (val) =>
      //       `${_.upperFirst(val)} [${
      //         client.commands.filter((c) => c.category === val)
      //           .size
      //       }]\n${client.commands
      //         .filter((c) => c.category === val)
      //         .map((value) => `\`${value.name}\``)
      //         .join(', ')}`
      //   ).join('\n\n')}`
      // )
      // .setColor('ORANGE')
      // message.channel.send(embed);
      const fields = [];

      for (const category of Object.keys(client.commands.category).filter((cat) => cat !== undefined)) {
        fields.push({
          name: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(), value: joinArray(client.commands.category.get(category).map((x) => `\`${x.name}\``))
        })
      }
      return message.channel.send(new MessageEmbed().setColor('ORANGE').addFields(fields.sort((a, b) => b.value.length - a.value.length))) 
    } else {
      const command =
        message.client.commands.get(args.join(' ').toLowerCase()) ||
        message.client.commands.find(
          (x) => x.aliases && x.aliases.includes(args.join(' ').toLowerCase())
        );

      if (!command)
        return message.channel.send(
          `\\${client.emotes.error} - I didn't find this command !`
        );

      await message.channel.send({
        embed: {
          color: 'ORANGE',
          author: { name: 'Help pannel' },
          fields: [
            { name: 'Name', value: command.name, inline: true },
            { name: 'Category', value: command.category, inline: true },
            {
              name: 'Aliase(s)',
              value:
                command.aliases.length < 1
                  ? 'None'
                  : command.aliases.join('\n'),
              inline: true,
            },
            {
              name: 'Utilisation',
              value: command.utilisation.replace('{prefix}', client.prefix),
              inline: true,
            },
            { name: 'Description', value: command.description, inline: false },
            {
              name: 'Cooldown',
              value: command.cooldown ? `${command.cooldown} seconds` : 'None',
              inline: true,
            },
            {
              name: 'Command can only be used in servers',
              value: command.guildOnly ? 'Yes' : 'No',
              inline: true,
            },
            {
              name: 'If the command require the `ADMINISTRATOR` permission',
              value: command.adminOnly ? 'Yes' : 'No',
              inline: true,
            },
            {
              name: 'If the command can be used only by the owner',
              value: command.ownerOnly ? 'Yes' : 'No',
              inline: true,
            },
            {
              name: 'User permissions',
              value:
                command.permissions.length === 0
                  ? 'None'
                  : command.permissions.map((x) =>
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
              name: 'Client permissions',
              value:
                command.clientPermissions.length === 0
                  ? 'None'
                  : command.clientPermissions.map((x) =>
                      x
                        .toLowerCase()
                        .replace(/(^|"|_)(\S)/g, (z) => z.toUpperCase())
                        .replace(/_/g, ' ')
                        .replace(/Use Vad/g, 'Use Voice Activity')
                        .replace(/Guild/g, 'Server')
                    ),
              inline: true,
            },
          ],
          timestamp: new Date(),
          description:
            'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
        },
      });
    }
  },
};

