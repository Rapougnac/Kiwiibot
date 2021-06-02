const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require('discord.js');

module.exports = {
  name: 'femdom',
  aliases: [],
  description: '',
  category: 'nsfw',
  utilisation: '{prefix}femdom',
  async execute(client, message, args) {
    if (message.channel.nsfw) {
      const GIF = await neko.nsfw.femdom();
      const embed = new Discord.MessageEmbed()
        .setColor('#202225')
        .setTitle(`${message.author.tag} here's a random femdom image/gif`)
        .setImage(GIF.url);
      message.channel.send(embed);
    } else {
      let m = await message.channel.send(
        '**Warning** this command cannot be used in non-nsfw channels!'
      );
      m.delete({ timeout: 10000 });
    }
  },
};
