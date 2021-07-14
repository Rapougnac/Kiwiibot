/* eslint-disable no-unused-vars */
const { MessageEmbed, GuildEmoji, Message } = require('discord.js');
const fetch = require('node-fetch');
const _text = require('../../util/string');
const Page = require('../../struct/Paginate');
const Client = require('../../struct/Client')
module.exports = {
  name: 'lyrics',
  aliases: ['ly'],
  category: 'music',
  description:
    'Searches for lyric info about a song from GeniuslLyrics if no query are provided.',
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   * @returns 
   */
  async execute(client, message, args) {
    let query = args.join(' ');
    if (
      query.toLowerCase() === 'np' ||
      query.toLowerCase() === 'nowplaying' ||
      query.toLowerCase() === 'now playing'
    ) {
      query = client.player.nowPlaying(message).title;
      const data = await fetch(
        `https://some-random-api.ml/lyrics?title=${encodeURI(query)}`
      )
        .then((res) => res.json())
        .catch(() => null);

      if (!data || data.error) {
        const msg = message.guild.i18n.__mf("lyrics.not_found",{
          emote: client.emotes.error, 
          author: message.author,
          music: args.join(' ')});
        return message.channel.send(msg);
      }

      if (data.lyrics.length < 2000) {
        return message.channel.send(
          new MessageEmbed()
            .setColor('DARK_BUT_NOT_BLACK')
            .setDescription(data.lyrics)
            .setThumbnail(data.thumbnail.genius)

            .setAuthor(`${data.title}\n${data.author}`, null, data.links.genius)
        );
      }

      const lyrics_array = data.lyrics.split('\n');
      const lyrics_subarray = [''];
      let n = 0;

      for (const line of lyrics_array) {
        if (lyrics_subarray[n].length + line.length < 2000) {
          lyrics_subarray[n] = lyrics_subarray[n] + line + '\n';
        } else {
          n++;
          lyrics_subarray.push(line);
        }
      }

      const pages = new Page(
        lyrics_subarray.map((x, i) =>
          new MessageEmbed()
            .setColor('DARK_BUT_NOT_BLACK')
            .setDescription(x)
            .setThumbnail(data.thumbnail.genius)
            .setFooter(
              [`Page ${i + 1} of ${lyrics_subarray.length}`].join(
                '\u2000•\u2000'
              )
            )
            .setAuthor(`${data.title}\n${data.author}`, null, data.links.genius)
        )
      );

      const msg = await message.channel.send(pages.currentPage);

      const prev = '◀';
      const next = '▶';
      const terminate = '❌';

      const collector = msg.createReactionCollector(
        (reaction, user) => user.id === message.author.id
      );
      const navigators = [prev, next, terminate];

      for (let i = 0; i < navigators.length; i++)
        await msg.react(navigators[i]);

      let timeout = setTimeout(() => collector.stop(), 180000);

      collector.on('collect', async ({ emoji: { name }, users }) => {
        switch (name) {
          case prev instanceof GuildEmoji ? prev.name : prev:
            msg.edit(pages.previous());
            break;
          case next instanceof GuildEmoji ? next.name : next:
            msg.edit(pages.next());
            break;
          case terminate instanceof GuildEmoji ? terminate.name : terminate:
            collector.stop();
            break;
        }

        await users.remove(message.author.id);
        timeout.refresh();
      });

      collector.on('end', async () =>
        (await msg.reactions.removeAll().catch(() => null)) ? null : null
      );
    } else {
      const data = await fetch(
        `https://some-random-api.ml/lyrics?title=${encodeURI(query)}`
      )
        .then((res) => res.json())
        .catch(() => null);

      if (!data || data.error) {
        const msg = message.guild.i18n.__mf("lyrics.not_found",{
          emote: client.emotes.error, 
          author: message.author,
          music: args.join(' ')});
        return message.channel.send(msg);
      }

      if (data.lyrics.length < 2000) {
        return message.channel.send(
          new MessageEmbed()
            .setColor('DARK_BUT_NOT_BLACK')
            .setDescription(data.lyrics)
            .setThumbnail(data.thumbnail.genius)

            .setAuthor(`${data.title}\n${data.author}`, null, data.links.genius)
        );
      }

      const lyrics_array = data.lyrics.split('\n');
      const lyrics_subarray = [''];
      let n = 0;

      for (const line of lyrics_array) {
        if (lyrics_subarray[n].length + line.length < 2000) {
          lyrics_subarray[n] = lyrics_subarray[n] + line + '\n';
        } else {
          n++;
          lyrics_subarray.push(line);
        }
      }

      const pages = new Page(
        lyrics_subarray.map((x, i) =>
          new MessageEmbed()
            .setColor('DARK_BUT_NOT_BLACK')
            .setDescription(x)
            .setThumbnail(data.thumbnail.genius)
            .setFooter(
              [`Page ${i + 1} of ${lyrics_subarray.length}`].join(
                '\u2000•\u2000'
              )
            )
            .setAuthor(`${data.title}\n${data.author}`, null, data.links.genius)
        )
      );

      const msg = await message.channel.send(pages.currentPage);

      const prev = '◀';
      const next = '▶';
      const terminate = '❌';

      const collector = msg.createReactionCollector(
        (reaction, user) => user.id === message.author.id
      );
      const navigators = [prev, next, terminate];

      for (let i = 0; i < navigators.length; i++)
        await msg.react(navigators[i]);

      let timeout = setTimeout(() => collector.stop(), 180000);

      collector.on('collect', async ({ emoji: { name }, users }) => {
        switch (name) {
          case prev instanceof GuildEmoji ? prev.name : prev:
            msg.edit(pages.previous());
            break;
          case next instanceof GuildEmoji ? next.name : next:
            msg.edit(pages.next());
            break;
          case terminate instanceof GuildEmoji ? terminate.name : terminate:
            collector.stop();
            break;
        }

        await users.remove(message.author.id);
        timeout.refresh();
      });

      collector.on('end', async () =>
        (await msg.reactions.removeAll().catch(() => null)) ? null : null
      );
    }
  },
};
