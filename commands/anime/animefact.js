const Color = "RANDOM", AnimeFacts = require("anime-facts");

module.exports = {
    name: "animefacts",
    aliases: ["af"],
    category: "Anime",
    description: "Return an Anime Fact!",
    utilisation: "{prefix}animefacts",
    async execute(client, message, args) {
        const Data = await AnimeFacts.facts();
        return message.channel.send({ embed: { color: Color, description: Data, timestamp: new Date() } });
    },
};