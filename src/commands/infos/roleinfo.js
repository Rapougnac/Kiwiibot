const { MessageEmbed, Message } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const Client = require('../../struct/Client');
module.exports = {
  name: 'roleinfo',
  aliases: ['ri'],
  description: 'Shows informations about the mentionned role',
  category: 'Infos',
  utilisation: '{prefix}roleinfo [role]',
  nsfw: false,
  guildOnly: true,
  adminOnly: false,
  ownerOnly: false,
  permissions: [],
  clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
  string: [],
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   * @returns {Promise<Message>}
   */
  async execute(client, message, args) {
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find((r) => r.name.toLowerCase() === args.join(' ').toLowerCase());
    if (!role)
      return message.channel.send(
        this.string[0]
      );
    let string = String();
    const permsArr = role.permissions.toArray();
    permsArr.forEach((perm) => {
      string += `\`${perm
        .toLowerCase()
        .replace(/(^|"|_)(\S)/g, (z) => z.toUpperCase())
        .replace(/_/g, ' ')
        .replace(/Use Vad/g, 'Use Voice Activity')
        .replace(/Guild/g, 'Server')}\`\n`;
    });
    message.channel.send(
      new MessageEmbed()
        .setDescription('Permissions\n' + string)
        .addField(this.string[1], role, true)
        .addField(this.string[2], role.name, true)
        .addField(this.string[3], role.members.size, true)
        .addField(this.string[4], role.hexColor, true)
        .addField(
          this.string[5],
          moment(role.createdAt).format(`[${this.string[6]}] DD/MM/YYYY [${this.string[7]}] HH:mm:ss`),
          true
        )
        .addField(this.string[8], role.hoist ? this.string[9] : this.string[10], true)
        .addField(this.string[11], role.mentionable ? this.string[9] : this.string[10], true)
        .setFooter(`ID : ${role.id}`)
        .setColor(role.hexColor)
    );
  },
};

