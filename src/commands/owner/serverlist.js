module.exports = {
    name: "serverlist",
    aliases: ["sl"],
    category: "owner",
    utilisation: "Serverlist",
    description: "Show Bot Server List!",
    adminOnly: false,
    ownerOnly: true,
    guildOnly: false,
    permissions: [],
    clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
    string: [],
    async execute(client, message, args) {
      const Guilds = client.guilds.cache.array().map((G, I) => `${I + 1}. **${G.name}** - **${G.id}** - **${G.memberCount} ${message.guild.i18n.__mf("serverlist.members")}**`).join("\n");
      if (!Guilds) return message.channel.send(message.guild.i18n.__mf("serverlist.no_guild"));
      return message.channel.send(Guilds, { split: { char: "\n" } }); 
    }
  };