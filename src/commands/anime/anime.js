const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const Kitsu = require('kitsu.js');
const { dropRight } = require('lodash');
module.exports = class AnimeCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'anime',
      aliases: [],
      description: 'Get informations about the specified anime',
      category: 'anime',
      cooldown: 10,
      utilisation: '{prefix}anime [anime]',
      string: [],
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const kitsu = new Kitsu();
    const search = args.join(' ');
    if (!search) {
      return message.channel.send(this.config.string[0]);
    }
    kitsu
      .searchAnime(search)
      .then(async (result) => {
        if (result.length === 0) {
          return message.channel.send(this.config.string[1].format(search));
        }
        if (result.length > 2) {
          const x = dropRight(result, result.length - 20);
          let string = String();
          x.forEach((ani, count) => {
            string += `**${count + 1}** - ${
              ani.titles.english
                ? ani.titles.english
                : ani.titles.abbreviated[0]
            }\n`;
          });
          await message.channel.send({
            embed: {
              author: {
                name: this.config.string[9],
              },
              title: this.config.string[14],
              description: string,
              footer: {
                text: `Requested by ${message.author.username}`,
                icon_url: message.author.displayAvatarURL({ dynamic: true }),
              },
            },
          });
          let number;
          /**
           * @param {Message} m
           * @returns {boolean}
           */
          const filter = (m) =>
            message.author.id === m.author.id &&
            m.channel.id === message.channel.id;
          const collector = message.channel.createMessageCollector(filter, {
            max: 1,
            time: 60000,
            errors: ['time'],
          });
          const continued = await new Promise((resolve) => {
            let count;
            collector
              .on('collect', async (m) => {
                const arg = m.content.toLowerCase().trim().split(/ +/g);
                number = parseInt(arg[0]);
                x.forEach((y, counter) => (count = counter + 1));
                if (number >= 1 && number <= count) {
                  resolve(true);
                } else {
                  return resolve(false);
                }
              })
              .on('end', () => resolve(false));
          });
          let c;
          x.forEach((y, counter) => (c = counter + 1));
          if (!continued)
            return message.channel.send(this.config.string[15].format(c));
          else {
            const anime = x[number - 1];
            const embed = new MessageEmbed()
              .setColor('#FF2050')
              .setAuthor(
                `${
                  anime.titles.english
                    ? anime.titles.english
                    : anime.titles.abbreviated[0]
                } | ${anime.showType}`,
                anime.posterImage.original,
                anime.url
              )
              .setDescription(anime.synopsis);
            if (anime.synopsis.length < 2000)
              embed
                .setDescription(
                  anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0]
                )

                .addField(
                  '❯\u2000 Informations',
                  `•\u2000 **${this.config.string[2]}** ${
                    anime.titles.romaji
                  }\n•\u2000 **${this.config.string[3]}** ${
                    anime.ageRatingGuide
                  }\n•\u2000 **NSFW:** ${
                    anime.nsfw ? this.config.string[4] : this.config.string[5]
                  }`,
                  true
                )
                .addField(
                  `❯\u2000 ${this.config.string[10]}`,
                  `•\u2000 **${this.config.string[6]}** ${anime.averageRating}\n•\u2000 **${this.config.string[7]}** ${anime.ratingRank}\n•\u2000 **${this.config.string[8]}** ${anime.popularityRank}`,
                  true
                )
                .addField(
                  '❯\u2000 Status',
                  `•\u2000 **Episodes:** ${
                    anime.episodeCount ? anime.episodeCount : 'N/A'
                  }\n•\u2000 **${this.config.string[11]}:** ${
                    anime.startDate
                  }\n•\u2000 **${this.config.string[12]}:** ${
                    anime.endDate ? anime.endDate : this.config.string[13]
                  }`,
                  true
                )
                .setThumbnail(anime.posterImage.original, 100, 200);

            return message.channel.send(embed);
          }
        } else {
          const anime = result[0];

          const embed = new MessageEmbed()
            .setColor('#FF2050')
            .setAuthor(
              `${
                anime.titles.english
                  ? anime.titles.english
                  : anime.titles.abbreviated[0]
              } | ${anime.showType}`,
              anime.posterImage.original,
              anime.url
            )
            .setDescription(anime.synopsis);
          if (anime.synopsis.length < 2000)
            embed
              .setDescription(
                anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0]
              )
              .addField(
                '❯\u2000 Informations',
                `•\u2000 **${this.config.string[2]}** ${
                  anime.titles.romaji
                }\n•\u2000 **${this.config.string[3]}** ${
                  anime.ageRatingGuide
                }\n•\u2000 **NSFW:** ${
                  anime.nsfw ? this.config.string[4] : this.config.string[5]
                }`,
                true
              )
              .addField(
                `❯\u2000 ${this.config.string[10]}`,
                `•\u2000 **${this.config.string[6]}** ${anime.averageRating}\n•\u2000 **${this.config.string[7]}** ${anime.ratingRank}\n•\u2000 **${this.config.string[8]}** ${anime.popularityRank}`,
                true
              )
              .addField(
                '❯\u2000 Status',
                `•\u2000 **Episodes:** ${
                  anime.episodeCount ? anime.episodeCount : 'N/A'
                }\n•\u2000 **${this.config.string[11]}** ${
                  anime.startDate
                }\n•\u2000 **${this.config.string[12]}** ${
                  anime.endDate ? anime.endDate : this.config.string[13]
                }`,
                true
              )
              .setThumbnail(anime.posterImage.original, 100, 200);

          return message.channel.send(embed);
        }
      })
      .catch((err) => {
        console.error(err.stack); //catching error
        return message.channel.send(this.config.string[1].format(search));
      });
  }
};
