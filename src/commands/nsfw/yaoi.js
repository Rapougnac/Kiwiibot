const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const fetch = require('node-fetch');
module.exports = class YaoiCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'yaoi',
      aliases: [],
      description: 'Get a yaoi pic (✿◕‿◕✿)',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}yaoi',
      nsfw: true,
      clientPermissions: ['EMBED_LINKS'],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const data = await fetch('https://nekobot.xyz/api/image?type=yaoi').then(
      (res) => res.json()
    );

    const embed = new MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true }),
        data.message
      )
      .setDescription(`${message.author.username} here a yaoi pic ^^`)
      .setColor(data.color)
      .setImage(data.message);
    message.channel.send(embed);
  }
};
