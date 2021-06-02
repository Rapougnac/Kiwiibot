const { MessageAttachment, Message, Client } = require('discord.js');
const canva = require('canvacord');

module.exports = {
  name: 'changemymind',
  aliases: ['cmm'],
  description: '',
  category: 'Misc',
  utilisation: '{prefix}changemymind [text]',
  cooldown: 5,
  guildOnly: false,
  ownerOnly: false,
  adminOnly: false,
  permissions: [],
  clientPermissions: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES'],
  string: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!args[0]) return message.channel.send(this.string[0]);

    const text = args.join(' ');

    const image = await canva.Canvas.changemymind(text);

    const changeMyMind = new MessageAttachment(image, 'cmm.png');

    message.channel.send(changeMyMind);
  },
};
