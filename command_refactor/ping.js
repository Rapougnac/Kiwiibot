module.exports = (client,message) => {
    message.channel.send(`🏓Pong : **${client.ws.ping}ms** !`);
}