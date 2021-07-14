/**@type {import('../../types/index').SlashCommand} */
const { language } = require('../../language');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'avatar',
  description: 'Get the avatar of you or the specified User',
  global: true,
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
   * @param {import('../../types').Interaction} interaction
   * @param {import('../struct/Client')} client
   * @param {*} args
   */
  async execute(interaction, client, args) {
    let guild = client.guilds.cache.get(interaction.guild_id);
    let user = args?.user;
    if (!user) user = interaction.member.user.id;

    const User = await client.users.fetch(user);
    if (guild) {
      var member = guild.member(User);
    }
    if (guild) {
      const embed = new MessageEmbed()
        .setAuthor(`${language(guild, 'avatar')[0].format(User.username)}`)
        .setDescription(
          `${language(guild, 'avatar')[1]}(${User.displayAvatarURL({
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
      client.utils.reply(interaction, embed);
    } else {
      const embed = new MessageEmbed()
        .setAuthor(`${language(guild, 'avatar')[0].format(User.username)}`)
        .setDescription(
          `${language(guild, 'avatar')[1]}(${User.displayAvatarURL({
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
      client.utils.reply(interaction, embed);
    }
  },
};
