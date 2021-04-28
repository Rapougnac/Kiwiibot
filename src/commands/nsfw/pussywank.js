const nekoclient = require('nekos.life');
const neko = new nekoclient();
const Discord = require('discord.js');

module.exports = {
  name: 'pussywank',
  aliases: [],
  description: '',
  category: 'Nsfw',
  utilisation: '{prefix}pussywank',
  async execute(client, message, args) {
    if (message.channel.nsfw) {
      let m = await message.channel.send(
        '**Warning** this command cannot be used in non-nsfw channels!'
      );
      m.delete({ timeout: 10000 });
    }
    const GIF = await neko.nsfw.pussyWankGif();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random pussy wank gif`)
      .setImage(GIF.url);
    message.channel.send(embed);
  },
};
