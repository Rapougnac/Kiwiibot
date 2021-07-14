// const nekoclient = require('nekos.life');
// const neko = new nekoclient();
// const Discord = require('discord.js');

// module.exports = {
//   name: 'hentaigif',
//   aliases: [],
//   description: '',
//   category: 'nsfw',
//   utilisation: '{prefix}hentaigif',
//   async execute(client, message, args) {
//     if (message.channel.nsfw) {
//       const GIF = await neko.nsfw.randomHentaiGif();
//       const embed = new Discord.MessageEmbed()
//         .setColor('#202225')
//         .setTitle(`${message.author.tag} here's a random hentai gif`)
//         .setImage(GIF.url);
//       message.channel.send(embed);
//     } else {
//       let m = await message.channel.send(
//         '**Warning** this command cannot be used in non-nsfw channels!'
//       );
//       m.delete({ timeout: 10000 });
//     }
//   },
// };
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
module.exports = class HentaiGifsCommand extends Command {
   /** 
    *@param {Client} client 
    */ 
  constructor(client) {
    super(client, {
      name: 'hentaigif',
      aliases: ['hentaigifs'],
      description: 'Get hentai gifs',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}hentaigif',
      nsfw: true,
    });
  }
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args) {
    const GIF = await neko.nsfw.randomHentaiGif();
      const embed = new MessageEmbed()
        .setColor('#202225')
        .setTitle(`${message.author.tag} here's a random hentai gif`)
        .setImage(GIF.url);
      message.channel.send(embed);
  }
};
