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
      )|| message.guild.roles.cache.find(r => r.name.includes(args.join(' ')))
    if (args.length <= 0) role = null;
    if (!role) return message.channel.send(message.guild.i18n.__mf("roleinfo.specify_role"));
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
        .addField(message.guild.i18n.__mf("roleinfo.role"), role, true)
        .addField(message.guild.i18n.__mf("roleinfo.role_name"), role.name, true)
        .addField(message.guild.i18n.__mf("roleinfo.who_own_it"), role.members.size, true)
        .addField(message.guild.i18n.__mf("roleinfo.color"), role.hexColor, true)
        .addField(
          message.guild.i18n.__mf("common.creation_date"),
          moment(role.createdAt).format(
            `[${message.guild.i18n.__mf("common.on")}] DD/MM/YYYY [${message.guild.i18n.__mf("common.at")}] HH:mm:ss`
          ),
          true
        )
        .addField(
          message.guild.i18n.__mf("roleinfo.hoisted"),
          role.hoist ? message.guild.i18n.__mf("common.yes") : message.guild.i18n.__mf("common.no"),
          true
        )
        .addField(
          message.guild.i18n.__mf("roleinfo.mentionnable"),
          role.mentionable ? message.guild.i18n.__mf("common.yes") : message.guild.i18n.__mf("common.no"),
          true
        )
        .setFooter(`ID : ${role.id}`)
        .setColor(role.hexColor)
    );
  }
};