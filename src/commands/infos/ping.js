const  formatNumber = (number, minimumFractionDigits = 0) => {
  return Number.parseFloat(number).toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits: 2,
  });
}
const { MessageEmbed, Message } = require('discord.js');
const Client = require('../../struct/Client');
module.exports = {
  name: 'ping',
  aliases: ['pouing'],
  description: 'Ping!',
  category: 'infos',
  cooldown: 5,
  utilisation: '{prefix}ping',
  nsfw: false,
  ownerOnly: false,
  guildOnly: false,
  adminOnly: false,
  permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
  clientPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  string: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    message.channel.startTyping();
    const msg = await message.inlineReply(`🏓 Pinging....`, {
      allowedMentions: {
        repliedUser: false,
      }
    });
    const ping = msg.createdTimestamp - message.createdTimestamp;
    const string = this.string[0].format('o'.repeat(Math.min(Math.round(ping / 100), 1500)), ping, formatNumber(client.ws.ping));
    msg.edit(string, {
      allowedMentions: {
        repliedUser: false,
      }
    });
    message.channel.stopTyping();
  },
};
