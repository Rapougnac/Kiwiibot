const { MessageEmbed, Message, Client } = require('discord.js');
const _ = require('lodash');
const fetch = require('node-fetch');
const text = require('../../util/string');

const badge = '<:MAL:808384986574094427> [MyAnimeList](https://myanimelist.net)';

module.exports = {
  name: 'character',
  aliases: ["char"],
  category: 'Anime',
  description: 'Searches for a character in <:MAL:808384986574094427> [MyAnimeList](https://myanimelist.net)',
  utilisation: "{prefix}character [character]",
  cooldown: 10,
  nsfw: false,
  guildOnly: false,
  adminOnly: false,
  ownerOnly: false,
  string: [],
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   * @returns
   */
  async execute(client, message, args) {

    const query = args.join(' ');

    
    //const embed = new MessageEmbed({ color: "YELLOW", description: `${this.string[0].format(query)}`, thumbnail: 'https://cdn.discordapp.com/attachments/494469722826604546/822838565842583582/tenor.gif'});
    const embed = new MessageEmbed().setColor("YELLOW").setThumbnail("https://cdn.discordapp.com/attachments/494469722826604546/822838565842583582/tenor.gif").setDescription(this.string[0].format(query))
    const msg = await message.channel.send(embed);
    //const embd = new MessageEmbed().setColor("YELLOW").setThumbnail("https://cdn.discordapp.com/attachments/819628139071668274/828319991521869864/SUnd8msYOTpAc7jjr4JzXKI6GxloJofHam0W87YIB3w.png").setDescription(this.string[1])
    //if(!query) return message.channel.send(embd)
    let data = await fetch(`https://api.jikan.moe/v3/search/character?q=${encodeURI(query)}&page=1`).then(res => res.json());

    const errstatus = {
      404: `${this.string[1].format(query)}`,
      429: `${this.string[2].format(badge)}`,
      500: `${this.string[3].format(badge)}`,
      503: `${this.string[3].format(badge)}`,
    }

    embed
    .setColor('RED')
    .setAuthor(data.status == 404 ? 'None Found' : 'Response Error')
    .setDescription(`**${message.member.displayName}**, ${errstatus[data.status] || `${this.string[4].format(badge, data.status)}`}`)
    .setThumbnail('https://i.imgur.com/qkBQB8V.png');

    if (!data || data.error){
      return await msg.edit(embed).catch(()=>null) || message.channel.send(embed);
    };

    const { results : [ { mal_id } ] } = data;

    let res = await fetch(`https://api.jikan.moe/v3/character/${mal_id}`)
    .then(res => res.json())
    .catch(() => {});

    embed.setDescription(`**${message.member.displayName}**, ${errstatus[data.status] || `${this.string[4].format(badge, data.status)}`}`);

    if (!res || res.error){
      return await msg.edit(embed).catch(()=>{}) || message.channel.send(embed);
    };

    const elapsed = Date.now() - msg.createdAt;
    const [ anime, manga ] = ['animeography', 'mangaography'].map(props => {
      const data = res[props]?.map(x => {
        const url = x.url.split('/').slice(0,5).join('/');
        return '[' + x.name + '](' + url + ') (' + x.role + ')';
      });
      return text.joinArrayAndLimit(data, 1000, ' • ');
    });
    const mediastore = { anime, manga };

    embed.setAuthor(`${res.name} ${res.name_kanji ? `• ${res.name_kanji}` : ''}`, null, res.url)
    .setThumbnail(res.image_url)
    .setColor('GREY')
    .setDescription(text.truncate(res.about.replace(/\\n/g,''),500,`... [Read More](${res.url})`))
    .addFields([
      ...['Anime', 'Manga'].map(media => {
        const store = mediastore[media.toLowerCase()];
        return {
          name: `${media} Appearances (${res[media.toLowerCase() + 'ography']?.length || 0})`,
          value: `${store?.text || 'None'} ${store.excess ? `\n...and ${store.excess} more!` : ''}`
        };
      }),
      ..._.chunk(res.voice_actors ,3).slice(0,3).map((va_arr, index) => {
        return {
          inline: true,
          name: index === 0 ? `Seiyuu (${res.voice_actors.length})` : '\u200b',
          value: va_arr.map((va, i) => {
            //const flag = client.anischedule.info.langflags.find(m => m.lang === va.language)?.flag;
            if (index === 2 && i === 2){
              return `...and ${res.voice_actors.length - 8} more!`;
            } else {
              return `${/*flag || */va.language} [${va.name}](${va.url})`;
            };
          }).join('\n') || '\u200b'
        };
      })
    ]);

    return await msg.edit(embed).catch(()=>null) || message.channel.send(embed);
  }
};