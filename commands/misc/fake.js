module.exports = {
    name: 'fake',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}fake',
    async execute(client, message, args) {
        // const args = message.content.trim().split(/ +/g);
        let member = message.mentions.users.first() //|| this.client.users.cache.get(args[0])
        if (!member) return message.channel.send('Utilisateur non défini');
        let botmsg = args.slice(0).slice(1).join(" ");
        if (!botmsg) return message.channel.send('hzedvbzt');
        message.channel.createWebhook(member.username, { avatar: member.displayAvatarURL({ format: "png" }) }).then(webhook => {
            if (message.member.hasPermission("MENTION_EVERYONE")) {
                webhook.send(botmsg, {
                    disableEveryone: false
                })
                setTimeout(() => webhook.delete(), 5000);
            } else {
                webhook.send(botmsg, {
                    disableEveryone: true
                })
                setTimeout(() => webhook.delete(), 5000);
            }
        })
        message.delete().catch();
    },
};
