module.exports = {
    name: 'debug',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}debug',

    async execute(client, message,args) {
        message.channel.send(`${client.emotes.success} - ${client.user.username} connected in **${client.voice.connections.size}** channels !`);
    },
};