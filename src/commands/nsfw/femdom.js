const Command = require('../../struct/Command');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { MessageEmbed } = require('discord.js');
module.exports = class FemDomCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'femdom',
      aliases: [],
      description: 'Get a pic of femdom hentai',
      category: 'infos',
      cooldown: 5,
      utilisation: '{prefix}femdom',
      nsfw: true,
    });
  }

  async execute(client, message) {
    const GIF = await neko.nsfw.femdom();
    const embed = new MessageEmbed()
      .setColor('#202225')
      .setAuthor(
        `${message.author.tag} here's a random femdom image/gif`,
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
