const Discord = require("discord.js");
module.exports = {
    name: 'poll',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}poll <command name>',

    async execute(client, message, args) {
        const reactions = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻']

        //const args = message.content.trim().split(/ +/g);
        const choices = args.join(' ').split(' | ').slice(1);
        const question = args.slice(1).join(' ').split('|')[0];

        if (!question) return message.channel.send('Veuillez indiquer la question à poser.');
        if (!choices.length) return message.channel.send('Veuillez indiquer au moins 1 choix.');
        if (choices.length > 20) return message.channel.send('Il ne peut pas y avoir plus de 20 choix.');
        message.delete()
        const sent = message.channel.send(new Discord.MessageEmbed()
            .setTitle(question)
            .setDescription(choices.map((choice, i) => `${reactions[i]} ${choice}`).join('\n\n')));
        for (i = 0; i < choices.length; i++)  sent.react(reactions[i]);
    },
};
