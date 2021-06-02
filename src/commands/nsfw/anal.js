const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { MessageEmbed, Message } = require('discord.js');

const Client = require('../../struct/Client');
module.exports = {
  name: 'anal',
  aliases: [],
  description: 'Returns a anal image/gif',
  category: 'nsfw',
  utilisation: '{prefix}anal',
  nsfw: true,
  guildOnly: false,
  adminOnly: true,
  ownerOnly: true,
  permissions: [],
  clientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL'],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const GIF = await neko.nsfw.anal();
    const { author, channel } = message;
    const { tag } = author;
    const embed = new MessageEmbed()
      .setColor('#202225')
      .setAuthor(
        `${tag} here's a random anal image/gif`,
        author.displayAvatarURL({ dynamic: true, format: 'png', size: 512 }),
        null
      )
      .setImage(GIF.url);
    channel.send(embed);
  },
};
