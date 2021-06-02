const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const GuildSchema = require('../../models/GuildSchema');

module.exports = {
  name: 'setmute',
  aliases: ['configmute'],
  description: 'Set the mute role',
  category: 'moderation',
  utilisation: '{prefix}setmute',
  cooldown: 5,
  nsfw: false,
  ownerOnly: false,
  adminOnly: false,
  guildOnly: true,
  permissions: ['MANAGE_ROLES', 'KICK_MEMBERS'],
  clientPermissions: [
    'SEND_MESSAGES',
    'VIEW_CHANNEL',
    'MANAGE_ROLES',
    'KICK_MEMBERS',
  ],
  string: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!args[0]) {
      return message.channel.send(this.string[0]);
    }
    const mutedRole =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    GuildSchema.findOne({ _id: message.guild.id }, async (err, data) => {
      if (err) return message.channel.send(this.string[1].format(err.name));

      if (data) {
        try{
        await GuildSchema.findOneAndUpdate(
          { _id: message.guild.id },
          {
            _id: message.guild.id,
            roles: {
              muted: mutedRole,
            },
          }
        );
        } catch (e) {
          return message.channel.send(this.string[1].format(e.name));
        }
      } else {

        try {
          data = new GuildSchema({
            _id: message.guild.id,
            roles: {
              muted: mutedRole,
            },
          });
        } catch (error) {
          return message.channel.send(this.string[1].format(error.name));
        }
      }
    });
  },
};
