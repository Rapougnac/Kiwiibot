const { MessageEmbed } = require('discord.js');
const { convert: toMarkdown } = require('html-to-markdown');
const { decode } = require('he');
const requireText = require('require-text');

const seiyuu = requireText('../../assets/graphql/Seiyuu.graphql', require);
const text = require('../../util/string');
module.exports = {
  name: 'seiyuu',
  aliases: ['voice', 'va'],
  category: 'Anime',
  description: 'Search for seiyuu\'s on your favorite anime characters',
  utilisation: "{prefix}seiyuu [voice actor/actress]",
  cooldown: 10,
  nsfw: false,
  guidlOnly: false,
  adminOnly: false,
  ownerOnly: false,
  permissions: [],
  clientPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL", "EMBED_LINKS"],
  async execute(client, message, args) {
    if(!seiyuu) return message.channel.send('doijcof')
    try {

      const search = args.join(' ');

      const embed = new MessageEmbed().setColor('YELLOW')
        .setFooter(`Seiyuu Query with AL | \©️${new Date().getFullYear()} Kiwii`)
        .setThumbnail('https://i.imgur.com/u6ROwvK.gif')
        .setDescription([
          `\u200B\nSearching for character named **${search}** on `,
          `<:anilist:808383197091725312> [Anilist](https://anilist.co 'Anilist Homepage').\n\u200B`
        ].join(''));

      let mainpage = await message.channel.send(embed);

      let res = await client.anischedule.fetch(seiyuu, { search });

      if (res.errors && res.errors.some(e => e.message !== 'Not Found.')) {
        embed.setColor('RED')
          .setAuthor('Response Error', 'https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
          .setThumbnail('https://i.imgur.com/qkBQB8V.png')
          .setDescription([
            `**${message.member.displayName}**, An unexpected error has occured!\n\n`,
            `${res.errors.map(({ message }) => '• ' + message).join('\n')}\n`,
            `Please try again in a few minutes. This is usually caused by a server downtime.`
          ].join(''));

        return await mainpage.edit(embed).catch(() => null) || message.channel.send(embed);
      };

      if (res.errors && res.errors.some(e => e.message === 'Not Found.')) {
        embed.setColor('RED')
          .setAuthor('None Found', 'https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
          .setThumbnail('https://i.imgur.com/qkBQB8V.png')
          .setDescription([
            `**${message.member.displayName}**, No results were found for **${search}**!\n\n`,
            `If you believe this seiyuu exists, try the following methods:\n`,
            `• Try the alternative names (e.g. English, Native, Romaji).\n`,
            `• Try their nickname (what these seiyuu usually called as at work).\n`,
            `• Check the spelling. Perhaps you didn't get it right.`
          ].join(''));

        return await mainpage.edit(embed).catch(() => null) || message.channel.send(embed);
      };

      const elapsed = Date.now() - message.createdTimestamp;

      embed.setColor('GREY')
        .setThumbnail(res.data.Staff.image.large)
        .setAuthor([
          res.data.Staff.name.full,
          res.data.Staff.name.native
        ].filter(Boolean).join('\u2000•\u2000'), null, res.data.Staff.siteUrl)
        .setDescription([
          client.anischedule.info.langflags.find(f => f.lang.toLowerCase() === res.data.Staff.language?.toLowerCase())?.flag,
          text.truncate(toMarkdown(decode(res.data.Staff.description || '\u200b')), 1000, `...[Read More](${res.data.Staff.siteUrl})`)
        ].join('\n'))
        .addFields([
          {
            name: `${res.data.Staff.name.full} voiced these characters`,
            value: text.joinArrayAndLimit(res.data.Staff.characters.nodes.map(x => {
              return `[${x.name.full}](${x.siteUrl.split('/').slice(0, 5).join('/')})`;
            }), 1000, ' • ').text || 'None Found.'
          }, {
            name: `${res.data.Staff.name.full} is part of the staff of these anime`,
            value: text.joinArrayAndLimit(res.data.Staff.staffMedia.nodes.map(s => {
              return `[${s.title.romaji}](${s.siteUrl.split('/').slice(0, 5).join('/')})`;
            }), 1000, ' • ').text || 'None Found.'
          }
        ])
        .setFooter([
          `Search duration: ${Math.abs(elapsed / 1000).toFixed(2)} seconds`,
          `Seiyuu Query with AL | \©️${new Date().getFullYear()} Kiwii`
        ].join('\u2000•\u2000'));

      return await mainpage.edit(embed).catch(() => null) || message.channel.send(embed).then(() => null);
    } catch (e) {
      message.channel.send(e)
    }
  }
};