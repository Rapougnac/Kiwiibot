const { Client, Message } = require('discord.js');
const GuildSchema = require('../../models/GuildSchema');

module.exports = {
  name: 'mute',
  aliases: [],
  description: 'Mute a person',
  category: 'Core',
  utilisation: '{prefix}mute <mention>',
  cooldown: 1,
  adminOnly: false,
  ownerOnly: false,
  guildOnly: true,
  nsfw: false,
  permissions: ['KICK_MEMBERS'],
  clientPermissions: [
    'KICK_MEMBERS',
    'MANAGE_ROLES',
    'SEND_MESSAGES',
    'VIEW_CHANNEL',
  ],
  string: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { guild, mentions, content, channel } = message;
    GuildSchema.findOne({ _id: guild.id }, async (err, data) => {
      if (err) return channel.send(this.string[0].format(err.name));
      if (!data.roles.muted)
        return channel.send(this.string[1].format(client.prefix));
    });
  },
};
