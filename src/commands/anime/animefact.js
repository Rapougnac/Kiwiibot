const Color = "RANDOM", AnimeFacts = require("anime-facts");

module.exports = {
    name: "animefacts",
    aliases: ["af"],
    category: "Anime",
    description: "Return an Anime Fact!",
    utilisation: "{prefix}animefacts",
    cooldown: 5,
    nsfw: false,
    guildOnly: false,
    adminOnly: false,
    ownerOnly: false,
    permissions: [],
    clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    string: [],
    async execute(client, message, args) {
        const Data = AnimeFacts.facts();
        return message.channel.send({ embed: { color: Color, description: Data, timestamp: new Date() } });
    },
};