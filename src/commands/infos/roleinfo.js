const { MessageEmbed, Message } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const Client = require('../../struct/Client');
const Command = require('../../struct/Command');
module.exports = class RoleInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'roleinfo',
      aliases: ['ri'],
      description: 'Shows informations about the mentionned role',
      category: 'infos',
      utilisation: '{prefix}roleinfo [role]',
      string: [],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @returns {Promise<Message>}
   */
  execute(client, message, args) {
    let role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        (r) => r.name.toLowerCase().startsWith(args.join(' ').toLowerCase()) || r.name.toLowerCase().endsWith(args.join(' ').toLowerCase())
      );
    if (args.length <= 0) role = null;
    if (!role) return message.channel.send(this.config.string[0]);
    let string = String();
    const permsArr = role.permissions.toArray();
    permsArr.forEach((perm) => {
      string += `\`${perm
        .toLowerCase()
        .replace(/(^|"|_)(\S)/g, (z) => z.toUpperCase())
        .replace(/_/g, ' ')
        .replace(/Use Vad/g, 'Use Voice Activity')
        .replace(/Guild/g, 'Server')}\`, `;
    });

    message.channel.send(
      new MessageEmbed()
        .setDescription('Permissions\n' + string)
        .addField(this.config.string[1], role, true)
        .addField(this.config.string[2], role.name, true)
        .addField(this.config.string[3], role.members.size, true)
        .addField(this.config.string[4], role.hexColor, true)
        .addField(
          this.config.string[5],
          moment(role.createdAt).format(
            `[${this.config.string[6]}] DD/MM/YYYY [${this.config.string[7]}] HH:mm:ss`
          ),
          true
        )
        .addField(
          this.config.string[8],
          role.hoist ? this.config.string[9] : this.config.string[10],
          true
        )
        .addField(
          this.config.string[11],
          role.mentionable ? this.config.string[9] : this.config.string[10],
          true
        )
        .setFooter(`ID : ${role.id}`)
        .setColor(role.hexColor)
    );
  }
};