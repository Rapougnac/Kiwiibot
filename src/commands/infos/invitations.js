const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
module.exports = class InvitationsCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'invitations',
      aliases: ['invites'],
      description: 'Get the the members who has invited the most people in the guild',
      category: 'infos',
      cooldown: 5,
      utilisation: '{prefix}invitations',
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    message.guild.fetchInvites().then((invites) => {
      const inviteCounter = {};

      invites.forEach((invite) => {
        const { uses, inviter } = invite;

        // eslint-disable-next-line no-unused-vars
        const { username, discriminator, tag } = inviter;


        inviteCounter[inviter] = (inviteCounter[inviter] || 0) + uses;
      });

      let replyText = new MessageEmbed()
        .setDescription('Invites: \n')
        .setColor('BLUE')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 512, format: 'png' }))

      let sortedInvites = Object.keys(inviteCounter).sort(
        (a, b) => inviteCounter[b] - inviteCounter[a]
      );

      if (sortedInvites.length > 5) sortedInvites.length = 5;

      for (const invite of sortedInvites) {
        const count = inviteCounter[invite];
        replyText.description += `\n${invite} has invited ${count} member(s)!`;
      }
      message.channel.send(replyText);
    });
  }
};
