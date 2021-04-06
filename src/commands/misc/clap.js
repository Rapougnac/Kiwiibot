module.exports = {
    name: 'clap',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}clap',
    async execute(client, message, args) {
        //const args = message.content.trim().split(/ +/g);
        let clap = args.join(" ").split(" ").join("<a:clap:554482751542132736>").slice(0).slice(1).slice(2).slice(3);
        if (!clap) return message.channel.send("Truc et flemme de dire l'erreur");

        if (message.member.hasPermission("MENTION_EVERYONE")) {
            message.channel.send(clap, {
                disableEveryone: false
            });
        } else {
            message.channel.send(clap, {
                disableEveryone: true
            });
        }
    },
};
