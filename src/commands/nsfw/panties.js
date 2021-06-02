const akaneko = require('akaneko');
const Discord = require('discord.js');

module.exports = {
  name: 'panties',
  aliases: [],
  description: '',
  category: 'nsfw',
  utilisation: '{prefix}panties',
  async execute(client, message, args) {
    if (message.channel.nsfw) {
      const emebed = new Discord.MessageEmbed()
        .setTitle(`${message.author.tag} here some panties`)
        .setImage(await akaneko.nsfw.panties());
      message.channel.send(emebed);
    } else {
      let m = await message.channel.send(
        '**Warning** this command cannot be used in non-nsfw channels!'
      );
      m.delete({ timeout: 10000 });
    }
  },
};
