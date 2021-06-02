const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');
const GuildSchema = require('../../models/GuildSchema');
module.exports = {
  name: 'setlogs',
  aliases: ['logs'],
  description: 'Set the logs in the mentionned channel',
  category: 'moderation',
  utilisation: '{prefix}setlogs',
  cooldown: 10,
  nsfw: false,
  ownerOnly: false,
  adminOnly: false,
  guildOnly: false,
  permissions: ['MANAGE_GUILD'],
  clientPermissions: [
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'VIEW_AUDIT_LOG',
    'EMBED_LINKS',
  ],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const channel = message.mentions.channels.first();

    if (!channel) {
      return message
        .inlineReplyNoMention("You didn't mention the channel")
        .then((x) => x.delete({ timeout: 3000 }));
    }

    await GuildSchema.findOne(
      {
        _id: message.guild.id,
      },
      async (err, data) => {
        if (err) return console.error(err);

        if (!data) {
          const guild = new GuildSchema({
            _id: message.guild.id,
            channels: {
              logs: channel.id,
            },
          });

          await guild
            .save()
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });

          return message.channel.send(
            `The logs channel has been setted to ${channel}!`
          );
        } else {
          data
            .updateOne({
              channels: {
                logs: channel.id,
              },
            })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.error(error);
            });
          return message.channel.send(
            `The logs channel has been setted to ${channel}!`
          );
        }
      }
    );
  },
};
