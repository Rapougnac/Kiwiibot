// const { MessageEmbed } = require("discord.js");

// module.exports = async (client, message) => {
//   if (message.guild.id !== "714158237406199899") return;
//   if (message.member.id === "253554702858452992") return;
//   if (message.member.id === "257196097494188032") return;
//   if (message.member.id === "605783492269309995") return;
//   if (message.member.id === "776825747897319424") return;
//   const fetchGuildAuditLogs = await message.guild.fetchAuditLogs({
//     limit: 1,
//     type: "MESSAGE_DELETE",
//   });
//   const latestMessageDeleted = fetchGuildAuditLogs.entries.first();
//   const { executor } = latestMessageDeleted;

//   const embed = new MessageEmbed()
//     .setAuthor(`Suppression d'un message`)
//     .setColor("#dc143c")
//     .setDescription(
//       `**Action**: suppression d'un message\n**Message supprimmé**: ${message.content}\n**Auteur du message**: ${message.author}`
//     )
//     .addField("**Channel**:", message.channel)
//     .setTimestamp()
//     .setFooter(executor.username, executor.displayAvatarURL());
//   message.guild.channels.cache.get("786674142719377408").send(embed);
// };
