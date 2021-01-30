module.exports = {
    name: 'join',
    aliases: [],
    category: 'events',
    utilisation: '{prefix}join',
    async execute(client, message, args) {
        if (message.content === `m?join`)
        client.emit(`guildMemberAdd`, message.member);
    },
};