const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'stealemoji',
  aliases: ['se'],
  description: 'Steal the provided emoji',
  category: 'misc',
  utilisation: '{prefix}stealemoji [emoji]',
  cooldown: 5,
  nsfw: false,
  ownerOnly: false,
  adminOnly: false,
  guildOnly: false,
  permissions: ['MANAGE_EMOJIS'],
  clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, [emoji, name]) {
    if (!name) {
      if (emoji.startsWith('<a:')) {
        name = emoji.match(/\w{3,33}/)[0];
      } else {
        name = emoji.match(/\w{2,32}/)[0];
      }
    }

    if (
      !(emoji.includes('<:') || (emoji.includes('<a:') && emoji.includes('>')))
    ) {
      return message.channel.send(
        ':x: Aucun émoji trouvé\n\n**Syntaxe :** ``a!emote <emoji>``'
      );
    }

    let link = `https://cdn.discordapp.com/emojis/${
      emoji.match(/\d{17,19}/)[0]
    }`;

    if (emoji.startsWith('<a:')) {
      link = `https://cdn.discordapp.com/emojis/${
        emoji.match(/\d{18,20}/)[0]
      }.gif`;
    }
    try {
      message.guild.emojis.create(link, name);
      await message.channel.send(
        "L'émote ``" + name + '`` est bien ajouté au serveur !'
      );
    } catch (e) {
      return console.error(e);
    }
  },
};
