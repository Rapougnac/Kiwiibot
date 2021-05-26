/* eslint-disable no-unused-vars */
const { MessageEmbed, GuildEmoji, Message } = require('discord.js');
const fetch = require('node-fetch');
const _text = require('../../util/string');
const Page = require('../../struct/Paginate');
const Client = require('../../struct/Client')
module.exports = {
  name: 'lyrics',
  aliases: ['ly'],
  category: 'Music',
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
        return message.channel.send(
          `\\❌ | ${message.author}, I couldn't find the lyrics for ${args.join(
            ' '
          )}!`
        );
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
        return message.channel.send(
          `\\❌ | ${message.author}, I couldn't find the lyrics for ${args.join(
            ' '
          )}!`
        );
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
// const {
//   Message,
//   MessageEmbed,
//   MessageAttachment,
//   ReactionEmoji,
//   User,
//   GuildEmoji,
// } = require('discord.js');
// const Client = require('../../struct/Client');

// module.exports = {
//   name: 'lyrics',
//   aliases: ['lyric', 'ly'],
//   description: '',
//   category: '',
//   utilisation: '{prefix}',
//   cooldown: 5,
//   nsfw: false,
//   ownerOnly: false,
//   adminOnly: false,
//   guildOnly: false,
//   permissions: [],
//   clientPermissions: [],
//   /**
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   async execute(client, message, args) {
//     const query = args.join(' ');
//     if (
//       query.toLowerCase() === 'np' ||
//       query.toLowerCase() === 'nowplaying' ||
//       query.toLowerCase() === 'now playing'
//     ) {
//       const str = `${client.player.nowPlaying(message).title}`;

//       client.lyrics.songs.search(str).then(
//         /**
//          * @param {Object} x
//          * @param {String} x.lyrics
//          */
//         async (x) => {
//           console.log(x)
//           if (x.length < 1) return;
//           const lyrics = await x[0].lyrics();
//           //const { artist, id, image, lyrics, thumbnail, title, url } = x[0];
//           const {
//             id: artistID,
//             image: artistImage,
//             name,
//             url: artistURL,
//           } = x[0].artist;
//           if (lyrics.length < 2000) {
//             const embed = new MessageEmbed({
//               title: x[0].title,
//               url: x[0].url,
//               footer: x[0].id,
//               description: lyrics,
//             })
//               .setAuthor(name, artistImage, artistURL)
//               .setThumbnail(x[0].thumbnail);
//             return message.channel.send(embed);
//           }

//           const Lyrics_array = lyrics.split('\n');
//           const Lyric_subarray = [''];
//           let n = 0;

//           for (const line of Lyrics_array) {
//             if (Lyric_subarray[n].length + line.length < 2000) {
//               Lyric_subarray[n] = Lyric_subarray[n] + line + '\n';
//             } else {
//               n++;
//               Lyric_subarray.push(line);
//             }
//           }

//           const pages = new Page(
//             Lyric_subarray.map((p, i) => {
//               new MessageEmbed()
//                 .setColor('DARK_BUT_NOT_BLACK')
//                 .setDescription(p)
//                 .setThumbnail(x[0].thumbnail)
//                 .setFooter(
//                   [`Page ${i + 1} of ${Lyric_subarray.length}`, 'Lyrics'].join(
//                     '\u200b•\u200b'
//                   )
//                 )
//                 .setAuthor(name, artistImage, artistURL)
//                 .setTitle(x[0].title);
//             })
//           );

//           const msg = await message.channel.send(pages.currentPage);

//           const previous = '⬅';
//           const next = '➡';
//           const close = '❌';

//           const collector = msg.createReactionCollector(
//             /**
//              *
//              * @param {ReactionEmoji} reaction
//              * @param {User} user
//              */
//             (reaction, user) => user.id === message.author.id
//           );

//           const nav = [previous, next, close];

//           for (let i = 0; i < nav.length; i++) await message.react(nav[i]);

//           const timeout = setTimeout(() => collector.stop(), 180000);

//           collector.on('collect', async ({ emoji: { name }, users }) => {
//             switch (name) {
//               case previous instanceof GuildEmoji ? previous.name : previous: {
//                 msg.edit(pages.previous());
//                 break;
//               }
//               case next instanceof GuildEmoji ? next.name : next: {
//                 msg.edit(pages.next());
//                 break;
//               }
//               case close instanceof GuildEmoji ? close.name : close: {
//                 collector.stop();
//                 break;
//               }
//             }

//             await users.remove(message.author.id);
//             timeout.refresh();
//           });

//           collector.on('end', async () => {
//             await msg.reactions.removeAll().catch((e) => console.error(e));
//           });
//         }
//       );
//     } else {
//       client.lyrics.songs.search(`${query}`).then(async (x) => {
//         if (x.length < 1) return;
//         const lyrics = await x[0].lyrics();

//         const {
//           id: artistID,
//           image: artistImage,
//           name,
//           url: artistURL,
//         } = x[0].artist;
//         if (lyrics.length < 2000) {
//           const embed = new MessageEmbed()
//             .setAuthor('DARK_BUT_NOT_BLACK')
//             .setAuthor(name, artistImage, artistURL)
//             .setThumbnail(x[0].thumbnail)
//             .setTitle(x[0].title)
//             .setURL(x[0].url)
//             .setFooter(x[0].id)
//             .setDescription(lyrics);
//           return message.channel.send(embed);
//         }

//         const Lyrics_array = lyrics.split('\n');
//         const Lyric_subarray = [''];
//         let n = 0;

//         for (const line of Lyrics_array) {
//           if (Lyric_subarray[n].length + line.length < 2000) {
//             Lyric_subarray[n] = Lyric_subarray[n] + line + '\n';
//           } else {
//             n++;
//             Lyric_subarray.push(line);
//           }
//         }

//         const pages = new Page(
//           Lyric_subarray.map((p, i) => {
//             new MessageEmbed()
//               .setColor('DARK_BUT_NOT_BLACK')
//               .setDescription(p)
//               .setThumbnail(x[0].thumbnail)
//               .setFooter(
//                 [`Page ${i + 1} of ${Lyric_subarray.length}`, 'Lyrics'].join(
//                   '\u200b•\u200b'
//                 )
//               )
//               .setAuthor(name, artistImage, artistURL)
//               .setTitle(x[0].title);
//           })
//         );

//         const msg = await message.channel.send(pages.currentPage);

//         const previous = '⬅';
//         const next = '➡';
//         const close = '❌';

//         const collector = msg.createReactionCollector(
//           /**
//            *
//            * @param {ReactionEmoji} reaction
//            * @param {User} user
//            */
//           (reaction, user) => user.id === message.author.id
//         );

//         const nav = [previous, next, close];

//         for (let i = 0; i < nav.length; i++) await message.react(nav[i]);

//         const timeout = setTimeout(() => collector.stop(), 180000);

//         collector.on('collect', async ({ emoji: { name }, users }) => {
//           switch (name) {
//             case previous instanceof GuildEmoji ? previous.name : previous: {
//               msg.edit(pages.previous());
//               break;
//             }
//             case next instanceof GuildEmoji ? next.name : next: {
//               msg.edit(pages.next());
//               break;
//             }
//             case close instanceof GuildEmoji ? close.name : close: {
//               collector.stop();
//               break;
//             }
//           }

//           await users.remove(message.author.id);
//           timeout.refresh();
//         });

//         collector.on('end', async () => {
//           await msg.reactions.removeAll().catch((e) => console.error(e));
//         });
//       });
//     }
//   },
// };
