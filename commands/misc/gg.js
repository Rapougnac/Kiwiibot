module.exports = {
    name:"testnsfw",
    async execute(client, message, args) {
        if (message.channel.nsfw) {
            message.channel.send("This channel is NSFW.");
        } else {
            message.channel.send("This channel is SFW.");
        }
    }
}