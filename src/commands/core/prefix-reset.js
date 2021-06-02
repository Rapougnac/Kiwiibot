const prefixSchema = require('../../models/PrefixSchema');
const { confirmation } = require('../../util/confirmation');
const { Message, Client } = require('discord.js');

module.exports = {
  name: 'prefix-reset',
  aliases: ['pr', 'clearprefix', 'resetprefix'],
  category: 'core',
  utilisation: '{prefix}prefix-reset',
  description: 'Reset the prefix',
  cooldown: 5,
  nsfw: false,
  guildOnly: false,
  ownerOnly: false,
  adminOnly: false,
  permissions: ['MANAGE_MESSAGES'],
  clientPermissions: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
  string: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    message.channel.send(this.string[0]).then(async (msg) => {
      const emoji = await confirmation(
        msg,
        message.author,
        ['✅', '❌'],
        10000
      );
      if (emoji === '✅') {
        msg.delete();
        await prefixSchema.findOneAndDelete({ GuildID: message.guild.id });
        message.channel.send(this.string[1].format(client.prefix));
      }
      if (emoji === '❌') {
        msg.delete();
        return message.channel.send(this.string[2]);
      }
    });
  },
};
