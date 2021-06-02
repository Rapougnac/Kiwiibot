const PrefixSchema = require('../../models/PrefixSchema');
const { Message, Client } = require('discord.js');

module.exports = {
  name: 'customprefix',
  aliases: ['cp', 'custp', 'cprefix', 'setprefix', 'setp'],
  category: 'core',
  utilisation: '{prefix}customprefix [prefix]',
  description: 'Change the default prefix to the specified prefix',
  cooldown: 5,
  adminOnly: false,
  ownerOnly: false,
  nsfw: false,
  guildOnly: false,
  permissions: ['MANAGE_MESSAGES'],
  clientPermissions: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
  string: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!args[0]) {
      return message.channel.send(this.string[0]);
    } else if (args[0].length > 5) {
      return message.channel.send(this.string[1]);
    }

    PrefixSchema.findOne({ GuildID: message.guild.id }, async (err, data) => {
      if (err) return message.channel.send(this.string[2].format(err.name));
      if (data) {
        await PrefixSchema.findOneAndDelete({ GuildID: message.guild.id });
        data = new PrefixSchema({
          GuildID: message.guild.id,
          Prefix: args[0],
        });
        data.save();
        message.channel.send(this.string[3].format(args[0]));
      } else {
        data = new PrefixSchema({
          GuildID: message.guild.id,
          Prefix: args[0],
        });
        data.save();
        message.channel.send(this.string[4].format(args[0]));
      }
    });
  },
};
