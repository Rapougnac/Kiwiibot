module.exports = {
    name: 'ban',
    aliases: [],
    description: 'Ban a person',
    category: 'Core',
    utilisation: '{prefix}ban',
    execute(client, message, args) {

        const args = message.content.trim().split(/ +/g)
        let mention = message.mentions.members.first();
        const member = message.mentions.members.first();
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        if (mention == undefined) {
            message.reply(" Erreur : mention du membre incomplète ou inexacte.");
        }
        else {
            if (mention.bannable) {
                mention.ban();
                message.channel.send(mention.displayName + " a été(e) banni(e) par " + message.author.username + " avec succès !");
            }
            else {
                message.reply(" Impossible de bannir ce membre.");
            }
        }
        message.channels.guild.cache.find(général).send(new Discord.MessageEmbed()
            .setAuthor(`[BAN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .addField('Durée', '∞', true)

        )
    },
};
