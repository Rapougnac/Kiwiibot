module.exports = {
    name: "serverlist",
    aliases: ["sl"],
    category: "Info",
    utilisation: "Serverlist",
    description: "Show Bot Server List!",
    async execute(client, message, args) {
      const Guilds = client.guilds.cache.array().map((G, I) => `${I + 1}. **${G.name}** - **${G.id}** - **${G.memberCount} members**`).join("\n");
      if (!Guilds) return message.channel.send("No Guild");
      return message.channel.send(Guilds, { split: { char: "\n" } }); 
    }
  };