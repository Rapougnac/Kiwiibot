module.exports = {
    name: 'fake',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}fake',
    async execute(client, message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.toLowerCase());
        if (!member) return message.channel.send('Utilisateur non défini');
        let botmsg = args.slice(0).slice(1).join(" ");
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
