const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
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
      adminOnly: true,
    });
  }
  /**
   *
   * @param {Client} client
   * @param {*} message
   */
  async execute(client, message) {
    message.channel.startTyping();
    const msg = await message.inlineReply(`🏓 Pinging....`, {
      allowedMentions: {
        repliedUser: false,
      },
    });
    const ping = msg.createdTimestamp - message.createdTimestamp;
    const string = this.config.string[0].format(
      'o'.repeat(Math.min(Math.round(ping / 100), 1500)),
      ping,
      formatNumber(client.ws.ping)
    );
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
