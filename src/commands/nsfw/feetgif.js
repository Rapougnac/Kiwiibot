// const Discord = require('discord.js');

// module.exports = {
//   name: 'feetgif',
//   aliases: [],
//   description: '',
//   category: 'nsfw',
//   utilisation: '{prefix}feetgif',
//   async execute(client, message, args) {
//     if (message.channel.nsfw) {
//       const GIF = await neko.nsfw.feetGif();
//       const embed = new Discord.MessageEmbed()
//         .setColor('#202225')
//         .setTitle(`${message.author.tag} here's a random feet gif`)
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
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class FeetGifCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'feetgif',
      aliases: [],
      description: 'Get a random feet gif',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}feetgif',
      nsfw: true,
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const GIF = await neko.nsfw.feetGif();
    const embed = new MessageEmbed()
      .setColor('#202225')
      .setAuthor(
        `${message.author.tag} here's a random feet gif`,
        message.author.displayAvatarURL({
          dynamic: true,
          size: 512,
          format: 'png',
        })
      )
      .setImage(GIF.url);
    message.channel.send(embed);
  }
};
