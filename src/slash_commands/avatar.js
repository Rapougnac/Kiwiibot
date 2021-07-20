const { MessageEmbed } = require('discord.js');
/**@type {import('../../types/index').SlashCommand} */
module.exports = {
  name: 'avatar',
  description: 'Get the avatar of you or the specified User',
  global: false,
  commandOptions: [
    {
      name: 'user',
      description: 'User to display',
      required: false,
      type: 6,
    },
  ],
  /**
   *
   * @param {import('../struct/Interactions/CommandInteraction')} interaction
   * @param {import('../struct/Client')} client
   * @param {object} args
   */
  async execute(interaction, client, { user }) {
    const { guild } = interaction;
    if (guild) {
      if (!user) user = interaction.user.id;
      const User = client.users.resolve(user);
      const member = guild.member(User);
      const embed = new MessageEmbed()
        .setAuthor(`Avatar of ${User.username}`)
        .setDescription(
          `If the image is not displayed, [click here](${User.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })})\n\nFormat: [webp](${User.displayAvatarURL({
            size: 4096,
          })}) • [jpg](${User.displayAvatarURL({
            format: 'jpg',
            size: 4096,
          })}) • [jpeg](${User.displayAvatarURL({
            format: 'jpeg',
            size: 4096,
          })}) • [png](${User.displayAvatarURL({
            format: 'png',
            size: 4096,
          })}) ${
            User.avatar.startsWith('a_')
              ? ` • [gif](${User.displayAvatarURL({
                  dynamic: true,
                  format: 'gif',
                  size: 4096,
                })})`
              : ''
          }`
        )
        .setImage(
          User.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })
        )
        .setColor(member.displayHexColor || 'GREY');
      interaction.send(embed);
    } else {
      if (!user) user = interaction.user.id;
      const User = client.users.resolve(user);
      const embed = new MessageEmbed()
        .setAuthor(`Avatar of ${User.username}`)
        .setDescription(
          `If the image is not displayed, [click here](${User.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })})\n\nFormat: [webp](${User.displayAvatarURL({
            size: 4096,
          })}) • [jpg](${User.displayAvatarURL({
            format: 'jpg',
            size: 4096,
          })}) • [jpeg](${User.displayAvatarURL({
            format: 'jpeg',
            size: 4096,
          })}) • [png](${User.displayAvatarURL({
            format: 'png',
            size: 4096,
          })}) ${
            User.avatar.startsWith('a_')
              ? ` • [gif](${User.displayAvatarURL({
                  dynamic: true,
                  format: 'gif',
                  size: 4096,
                })})`
              : ''
          }`
        )
        .setImage(
          User.displayAvatarURL({
            size: 4096,
            dynamic: true,
            format: 'png',
          })
        )
        .setColor('GREY');
      interaction.send(embed);
    }
  },
};
