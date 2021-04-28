function formatNumber(number, minimumFractionDigits = 0) {
  return Number.parseFloat(number).toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits: 2,
  });
}
const { MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const ExtMessage  = require('../../struct/Message');
module.exports = {
  name: 'ping',
  aliases: ['p'],
  description: 'Ping!',
  category: 'Infos',
  cooldown: 5,
  utilisation: '{prefix}ping',
  nsfw: false,
  ownerOnly: false,
  guildOnly: false,
  adminOnly: false,
  permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
  clientPermissions: [],
  string: [],
  /**
   *
   * @param {Client} client
   * @param {ExtMessage} message
   * @param {String[]} args
   */
  async execute(client, message) {
    message.channel.startTyping();
    const msg = await message.inlineReply(`🏓 Pinging....`, {
      allowedMentions: {
        repliedUser: false,
      }
    });
    const ping = msg.createdTimestamp - message.createdTimestamp;
    const string = this.string[0].format(ping, formatNumber(client.ws.ping));
    msg.edit(string, {
      allowedMentions: {
        repliedUser: false,
      }
    });
    message.channel.stopTyping();
  },
};
