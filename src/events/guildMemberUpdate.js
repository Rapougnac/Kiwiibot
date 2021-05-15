'use strict';

// const { MessageEmbed, Client, GuildMember } = require('discord.js');

// function stringifyPropsInOrder(obj) {
//   var keys = Object.keys(obj).sort();
//   var output = [],
//     prop;
//   for (var i = 0; i < keys.length; i++) {
//     prop = keys[i];
//     output.push(prop);
//     output.push(obj[prop]);
//   }
//   return JSON.stringify(output);
// }
// guildMemberUpdate
/**Emitted whenever a guild member changes - i.e. new role, removed role, nickname.
 * PARAMETER:                             TYPE:              DESCRIPTION:
 * @param {GuildMember}  oldMember        GuildMember        The member before the update.
 * @param {GuildMember}  newMember        GuildMember        The member after the update.
 * @param {Client=}      client           Client             The client that instantiated this Event.
 */

module.exports = async (client, oldMember, newMember) => {
  return;
  //   if(stringifyPropsInOrder(newMember)!=stringifyPropsInOrder(oldMember)){
  //     const fetchGuildAuditLogs = await oldMember.guild.fetchAuditLogs({
  //         limit: 1,
  //         type: 'MEMBER_UPDATE'
  //     });
  //     const latestMemberUpdated = fetchGuildAuditLogs.entries.first();
  //     const { executor } = latestMemberUpdated;
  //     try{
  //     const embed = new MessageEmbed()
  //         .setAuthor(`Modification d'un membre`)
  //         .setColor('YELLOW')
  //         .setDescription(`**Action**: modification d'un membre\n**Nom du membre**: ${oldMember.name}\n**Nom du salon maintenant**: ${newMember.name}`)
  //         .addField('**Type de channel**:')
  //         .addField('**ID**:', newMember.id)
  //         .setTimestamp()
  //         .setFooter(executor.username, executor.displayAvatarURL())
  //     newMember.guild.channels.cache.get('').send(embed);
  //     } catch (e) {
  //       //
  //     }
  //   }
};
