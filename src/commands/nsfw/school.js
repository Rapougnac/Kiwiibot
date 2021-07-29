const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const akaneko = require('akaneko');
module.exports = class SchoolCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'school',
      aliases: [],
      description: '',
      category: 'nsfw',
      cooldown: 5,
      utilisation: '{prefix}school',
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const emebed = new MessageEmbed()
      .setAuthor(
        `${message.author.tag} here some school uniforms :)`,
        message.author.displayAvatarURL({
          dynamic: true,
          format: 'png',
          size: 4096,
        }),
        akaneko.nsfw.school()
      )
      .setImage(akaneko.nsfw.school());
    message.channel.send(emebed);
  }
};
