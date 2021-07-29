const moment = require('moment');
const { API } = require('nhentai-api');
const api = new API();
require('moment-duration-format');
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class SauceCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'sauce',
      aliases: ['gimmesauce', 'saucefor'],
      description: '',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}sauce [id]',
      nsfw: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, [id]) {
    if (isNaN(id)) {
      return message.channel.send(
        `<:cancel:767062250279927818> | ${message.author}, Please provide a valid **Sauce**.`
      );
    }

    const prompt = new MessageEmbed()
      .setColor('YELLOW')
      .setThumbnail('https://i.imgur.com/u6ROwvK.gif')
      .setDescription(
        `Searching for **${id}** on <:nhentai:767062351169323039> [nHentai.net](https:/nhentai.net 'nHentai Homepage').`
      );

    const msg = await message.channel.send(prompt);
    const book = await api.getBook(id).catch(() => null);

    if (!book) {
      prompt
        .setColor('RED')
        .setAuthor(
          'None Found',
          'https://cdn.discordapp.com/emojis/767062250279927818.png?v=1'
        )
        .setDescription(
          `**${message.member.displayName}**, couldn't find doujin with sauce **${id}**.`
        )
        .setThumbnail('https://i.imgur.com/qkBQB8V.png');

      return (
        (await msg.edit(prompt).catch(() => null)) ||
        message.channel.send(prompt)
      );
    }

    const {
      title: { _english, _japanese, pretty },
      _tags,
      _pages,
      _uploaded,
      cover,
    } = book;

    const embed = new MessageEmbed()
      .setColor('GREY')
      .setAuthor(pretty, null, `https://nhentai.net/g/${id}`)
      .setDescription(`**${book.title.english}**\n*${book.title.japanese}*`)
      .setThumbnail(api.getImageURL(cover))
      .addFields([
        {
          name: 'TAGS',
          value: book.tags
            .map((m) => m.name)
            .sort()
            .join(', '),
        },
        { name: 'PAGES', value: book.pages.length, inline: true },
        {
          name: 'Uploaded on',
          value: [
            moment(book.uploaded).format('dddd Do MMMM YYYY'),
            '\n',
            moment
              .duration(Date.now() - book.uploaded)
              .format('Y [Years] M [Months, and] D [Days]'),
            ' ago.',
          ].join(''),
          inline: true,
        },
        {
          name: '\u200b',
          value: [
            `[\`[LINK]\`](https://nhentai.net/g/${id} `,
            `'Click here to proceed to ${book.title.pretty}'s nHentai Page')`,
          ].join(''),
          inline: true,
        },
      ]);

    return (
      (await msg.edit(embed).catch(() => null)) || message.channel.send(embed)
    );
  }
};
