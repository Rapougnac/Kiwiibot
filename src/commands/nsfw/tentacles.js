const akaneko = require('akaneko');
const Discord = require('discord.js');

module.exports = {
  name: 'tentacles',
  aliases: [],
  description: '',
  category: 'Nsfw',
  utilisation: '{prefix}tentacles',
  async execute(client, message, args) {
    if (message.channel.nsfw) {
      const emebed = new Discord.MessageEmbed()
        .setTitle(
          `${message.author.tag} here some tentacles (I don't judge you but...)`
        )
        .setImage(await akaneko.nsfw.tentacles());
      message.channel.send(emebed);
    } else {
      let m = await message.channel.send(
        '**Warning** this command cannot be used in non-nsfw channels!'
      );
      m.delete({ timeout: 10000 });
    }
  },
};
