const figlet = require('figlet');
const Client = require('../../struct/Client');
const { Message } = require('discord.js');
module.exports = {
  name: 'ascii',
  aliases: [],
  description: 'Convert your text to ASCII code ',
  category: 'misc',
  utilisation: '{prefix}ascii [text]',
  cooldown: 10,
  nsfw: false,
  guildOnly: false,
  adminOnly: false,
  ownerOnly: false,
  permissions: [],
  clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
  string: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @returns {Promise<Message>}
   */
  async execute(client, message, args) {
    let text = args.join(' ');

    if (!text) {
      return message.inlineReply(this.config.string[0], {
        allowedMentions: {
          repliedUser: false,
        },
      });
    }

    if (text.length > 20) {
      return message.inlineReply(this.config.string[1], {
        allowedMentions: {
          repliedUser: false,
        },
      });
    }
    figlet(text, (err, data) => {
      message.channel.send(data, {
        code: 'AsciiArt',
      });
    });
  },
};
