const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const { Message } = require('discord.js');
module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      aliases: ['pouing'],
      description: 'Ping!',
      category: 'infos',
      cooldown: 120,
      utilisation: '{prefix}ping',
      string: [],
    });
  }
  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  async execute(client, message) {
    message.channel.startTyping();
    const msg = await message.inlineReply(`🏓 Pinging....`, {
      allowedMentions: {
        repliedUser: false,
      },
    });
    const ping = msg.createdTimestamp - message.createdTimestamp;
    const string = message.guild.i18n.__mf('ping.msg',{
      pong: 'o'.repeat(Math.min(Math.round(ping / 100), 1500)),
      ping: ping,
      heartbeat: formatNumber(client.ws.ping)})
    msg.edit(string, {
      allowedMentions: {
        repliedUser: false,
      },
    });
    message.channel.stopTyping();
  }
};

const formatNumber = (number, minimumFractionDigits = 0) => {
  return Number.parseFloat(number).toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits: 2,
  });
};
