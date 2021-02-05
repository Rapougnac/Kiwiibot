const Color = "RANDOM", AnimeFacts = require("anime-facts");

module.exports = {
    name: "animefact",
    aliases: ["af"],
    category: "Anime",
    description: "Return an Anime Fact!",
    usage: "Animefact",
    async execute(client, message, args) {
        const Data = await AnimeFacts.facts();
        return message.channel.send({ embed: { color: Color, description: Data, timestamp: new Date() } });
    },
};