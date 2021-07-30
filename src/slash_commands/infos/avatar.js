const {
  Message,
  MessageEmbed,
  MessageAttachment,
  // eslint-disable-next-line no-unused-vars
  User,
} = require('discord.js');
const CommandInteraction = require('../../struct/Interactions/CommandInteraction');
const SlashCommand = require('../../struct/SlashCommand');
const Client = require('../../struct/Client');
module.exports = class AvatarSlashCommand extends SlashCommand {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'avatar',
      description: 'Get the avatar of yourself or the specified user.',
      global: true,
      commandOptions: [
        {
          name: 'user',
          description: 'User to display.',
          type: 6,
          required: false,
        },
      ],
    });
  }
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   * @param {{user: User}} args
   */
  async execute(interaction, client, { user }) {
    const { guild } = interaction;
    if (guild) {
      if (!user) user = interaction.user;
      const member = guild.member(user);
      const embed = new MessageEmbed()
        .setAuthor(`Avatar of ${user.username}`)
        .setDescription(
          `If the image is not displayed, [click here](${user.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })})\n\nFormat: [webp](${user.displayAvatarURL({
            size: 4096,
          })}) • [jpg](${user.displayAvatarURL({
            format: 'jpg',
            size: 4096,
          })}) • [jpeg](${user.displayAvatarURL({
            format: 'jpeg',
            size: 4096,
          })}) • [png](${user.displayAvatarURL({
            format: 'png',
            size: 4096,
          })}) ${
            user.avatar.startsWith('a_')
              ? ` • [gif](${user.displayAvatarURL({
                  dynamic: true,
                  format: 'gif',
                  size: 4096,
                })})`
              : ''
          }`
        )
        .setImage(
          user.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })
        )
        .setColor(member.displayHexColor || 'GREY');
      interaction.send(embed);
    } else {
      if (!user) user = interaction.user;
      const embed = new MessageEmbed()
        .setAuthor(`Avatar of ${user.username}`)
        .setDescription(
          `If the image is not displayed, [click here](${user.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })})\n\nFormat: [webp](${user.displayAvatarURL({
            size: 4096,
          })}) • [jpg](${user.displayAvatarURL({
            format: 'jpg',
            size: 4096,
          })}) • [jpeg](${user.displayAvatarURL({
            format: 'jpeg',
            size: 4096,
          })}) • [png](${user.displayAvatarURL({
            format: 'png',
            size: 4096,
          })}) ${
            user.avatar.startsWith('a_')
              ? ` • [gif](${user.displayAvatarURL({
                  dynamic: true,
                  format: 'gif',
                  size: 4096,
                })})`
              : ''
          }`
        )
        .setImage(
          user.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })
        )
        .setColor('GREY');
      interaction.send(embed);
    }
  }
};
