const Discord = require("discord.js");

module.exports = {
    name: '8ball',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}8ball',
    async execute(client, message, args) {
        const _mention = message.mentions.members.first();
        const question = args;
        if (!args) return message.channel.send('Veuillez indiquer une question.');
        const replies = ['Oui', 'Non', 'Peut être', 'Evidemment', "Pas sûr", "Que nenni !", "Bien sûr !", "Non connard !", "JAMAIS", "Non parce que je t'aimes pas :)", 'Je ne sais pas', 'Ça tombe sous le sens', 'Je regrette mais non', 'Oui, ça me paraît logique', 'Non désolé t\'es trop moche', 'Jamais de la vie', 'LOL tu crois quoi bien sûr que non', 'C\'est une possibilité', 'Alors ça non'];
        const embed8 = new Discord.MessageEmbed()
            .setThumbnail('https://cdn.discordapp.com/attachments/692311925098414134/793453658184220692/pngegg.png')
            .setColor('RANDOM')
            .addField(`**Question**`, `${question}`, false)
            .addField(`**Réponse**`, `${replies[Math.floor(Math.random() * replies.length)]}`, false)
        message.channel.send(embed8);
    },
};
