const booru = require('booru');
const { BooruError, _sites } = require('booru');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'r34',
  aliases: [],
  description: 'Scrap images of the r34',
  category: 'nsfw',
  utilisation: '{prefix}r34',
  cooldown: 5,
  nsfw: true,
  guildOnly: false,
  adminOnly: false,
  ownerOnly: false,
  permissions: [],
  clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
  async execute(client, message, args) {
    const query = args.join(' ');
    if (query) {
      booru
        .search('rule34', [query], { nsfw: true, limit: 1, random: true })
        .then(booru)
        .then(async (images) => {
          if (images.length === 0) {
            let msg = await message.channel.send(
              `No results found for **${query}**!`
            );
            msg.delete({ timeout: 5000 });
          }
          if (query === 'LOLI'.toLowerCase())
            return message.channel.send('Mommy I see a pedo');
          for (let image of images) {
            const embed = new MessageEmbed()
              .setAuthor(
                'Rule34',
                'https://gtswiki.gt-beginners.net/decal/png/04/87/77/6927195936641778704_1.png'
              )
              .setDescription(
                `・ Rating: \`${image.rating}\` (s: 'Safe' q: 'Questionable' e: 'Explicit' u: 'Unrated' | Score: ${image.score})`
              )
              .setImage(image.fileUrl)
              .setColor('#FF0000')
              .setFooter(`Tags: ${image.tags.slice(',').join(' | ')}`)
              .setURL(image.fileUrl);
            message.channel.send(embed);
          }
        })
        .catch((err) => {
          if (err instanceof BooruError) {
            return message.channel.send(
              `No results found for **${query}**!` + err
            );
          } else {
            return message.channel.send(`No results found for **${query}**!`);
          }
        });
    } else return message.channel.send('Please specify at least one tag');
  },
};
