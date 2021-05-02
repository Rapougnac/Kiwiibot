const { MessageEmbed, Message } = require('discord.js');
const Client = require('../struct/Client');
const GuildSchema = require('../models/GuildSchema');
/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  return;
  // if (message.guild.me.permissions.has('VIEW_AUDIT_LOG')) {
  //   const fetchGuildAuditLogs = await message.guild.fetchAuditLogs({
  //     user: message.author,
  //     limit: 1,
  //     type: 'MESSAGE_DELETE',
  //   });
  //   console.log(fetchGuildAuditLogs);
  //   // console.log(fetchGuildAuditLogs.entries);
  //   // const latestMessageDeleted = fetchGuildAuditLogs.entries.first();
  //   // console.log(latestMessageDeleted);
  //   // const { executor } = latestMessageDeleted;
  //   // console.log(executor);
  //   await GuildSchema.findOne({ _id: message.guild.id }, async (err, data) => {
  //     if (err)
  //       return message.channel.send(
  //         `[DATABASE_ERROR] The database responded with the following error: ${err.name}`
  //       );
  //     if (!data) {
  //       return;
  //     } else if (data === undefined) {
  //       return;
  //     } else if (data === null) {
  //       return;
  //     } else {
  //       const embed = new MessageEmbed()
  //         .setAuthor(`Suppression d'un message`)
  //         .setColor('#dc143c')
  //         .setDescription(
  //           `**Action**: suppression d'un message\n**Message supprimmé**: ${message.content}\n**Auteur du message**: ${message.author}`
  //         )
  //         .addField('**Channel**:', message.channel)
  //         .setTimestamp()
  //         //.setFooter(executor.username, executor.displayAvatarURL());
  //       message.guild.channels.cache.get(data.channels.logs).send(embed);
  //     }
  //   });
  // } else {
  //   return message.channel.send(
  //     "Oops, looks like I'm unable to fetch the Guild Logs, can you please give me the permission ?"
  //   );
  // }
};
