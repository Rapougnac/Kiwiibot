const Discord = require("discord.js");

module.exports = {
    name: 'join',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}join',
    execute(client, message, args) {
        client.emit(`guildMemberAdd`, message.member);
    },
};
