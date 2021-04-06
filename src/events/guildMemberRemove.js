module.exports = async (client, member) => {
  if (member.guild.id !== "714158237406199899") return;
    const channel = member.guild.channels.cache.get("779275678519525377");
  if (!channel) return;
  channel.send(`**${member.user.tag}** vient de quitter le serveur~ <:facepalm:770056223185567764>`)
};