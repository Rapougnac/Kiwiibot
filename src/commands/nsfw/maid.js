const akaneko = require('akaneko');
const Discord = require('discord.js');

module.exports = {
  name: 'maid',
  aliases: ['maids'],
  description: '(Maids, Maid Uniforms, etc, you know what maids are :3)',
  category: 'nsfw',
  utilisation: '{prefix}maid',
  async execute(client, message, args) {
    if (message.channel.nsfw) {
      const emebed = new Discord.MessageEmbed()
        .setTitle(`${message.author.tag} here some maids`)
        .setImage(await akaneko.nsfw.maid());
      message.channel.send(emebed);
    } else {
      let m = await message.channel.send(
        '**Warning** this command cannot be used in non-nsfw channels!'
      );
      m.delete({ timeout: 10000 });
    }
  },
};
