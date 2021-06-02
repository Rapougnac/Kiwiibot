module.exports = {
    name: 'say',
    aliases: [],
    description: 'Say the text of the message sent by the author',
    category: 'misc',
    utilisation: '{prefix}say',
    ownerOnly: true,
    adminOnly: false,
    guildOnly: false,
    permissions: ["ATTACH_FILES"],
    clientPermissions: [],

    async execute(client, message, args) {
        const botmessage = args.join(" ");
        message.delete().catch();
        message.channel.send(botmessage);
    },
};
