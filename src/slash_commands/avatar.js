/**@type {import('../../types/index').SlashCommand} */
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

    
    if (guild) {
      if (!user) user = interaction.member.user.id;
      const User = await client.users.fetch(user);
      const member = guild.member(User);
      const embed = new MessageEmbed()
        .setAuthor(`${guild.i18n.__mf("avatar.avatar_of",{avatar: User.username})}`)
        .setDescription(
          `${message.guild.i18n.__mf("avatar.msg")}(${User.displayAvatarURL({
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
      guild = null;
      if(!user) user = interaction.user.id;
      const User = await client.users.fetch(user)
      const embed = new MessageEmbed()
        .setAuthor(`${guild.i18n.__mf("avatar.avatar_of",{avatar: User.username})}`)
        .setDescription(
          `${message.guild.i18n.__mf("avatar.msg")}(${User.displayAvatarURL({
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
