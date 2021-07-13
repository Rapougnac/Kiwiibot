const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class SetOwnerCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'setowner',
      aliases: ['seto'],
      description: 'Add an owner in the list of the owners',
      category: 'owner',
      cooldown: 5,
      utilisation: '{prefix}setowner [id]',
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {string[]} args
   */
  async execute(client, message, [id]) {
    if (!id)
      return message.inlineReply('Please, specify a certain id!', {
        allowedMentions: {
          repliedUser: false,
        },
      });
    if (id.length > 18)
      return message.inlineReply('This seems to be an invalid id, try again.', {
        allowedMentions: {
          repliedUser: false,
        },
      });
    if (message.guild.members.cache.get(id)?.user.bot)
      return message.inlineReply(
        'Bots cannot be set as owner of an another bot!',
        {
          allowedMentions: {
            repliedUser: false,
          },
        }
      );
    if (this.client.owners.includes(id))
      return message.inlineReply('This user is already an owner!', {
        allowedMentions: {
          repliedUser: false,
        },
      });

    this.setOwner(id)
        return await message.inlineReply(`${message.guild.members.cache.get(id).user.username} has successfully been setted as an owner`);
    
  }
  /**
   * @param {string} id The id of the user
   */
  setOwner(id) {
    this.client.owners.push(id);
  }
};
