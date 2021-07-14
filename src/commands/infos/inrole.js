const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class InRoleCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'inrole',
      aliases: ['ir'],
      description: 'Get all members with the specified role',
      category: 'infos',
      cooldown: 5,
      utilisation: '{prefix}inrole [role id, mention or name]',
      string: [],
      clientPermissions: ['EMBED_LINKS'],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    let role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        (r) =>
          r.name.toLowerCase().startsWith(args.join(' ').toLowerCase()) ||
          r.name.toLowerCase().endsWith(args.join(' ').toLowerCase())
      )
      || message.guild.roles.cache.find(r => r.name.includes(args.join(' ')))
    if (args.length <= 0) role = null;
    if (!role) return this.inlineReply(message.guild.i18n.__mf('inrole.missing_role'));
    const memRole = message.guild.roles.cache
          .get(role.id)
          .members.map((m) =>`${m.user.tag}${(m.user.bot ? '[BOT]' : '')}`).join('\n')/*.sort((a, b) => a.localeCompare(b)).join(', ')*/
    const embed = new MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({
          dynamic: true,
          size: 512,
          format: 'png',
        })
      )
      .setTitle(message.guild.i18n.__mf('inrole.dislay_role',{role_name: role.name}))
      .setColor(role.color)
      .setDescription(`\`\`\`css\n${memRole}\`\`\``);
    this.respond(embed);
  }
};
