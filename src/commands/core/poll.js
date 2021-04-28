const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'poll',
    aliases: [],
    category: 'Core',
    utilisation: '{prefix}poll [question]',
    cooldown: 5,
    nsfw: false,
    guildOnly: false,
    adminOnly: true,
    ownerOnly: false,
    permissions: [],
    clientPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL", "EMBED_LINKS"],

    async execute(client, message, args) {
        const reactions = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻']

        const choices = args.join(' ').split(' | ').slice(1);
        const question = args.join(' ').split('|')[0];

        if (!question) return message.channel.send('Veuillez indiquer la question à poser.');
        if (!choices.length) return message.channel.send('Veuillez indiquer au moins 1 choix.');
        if (choices.length > 20) return message.channel.send('Il ne peut pas y avoir plus de 20 choix.');
        message.delete()
        const sent = await message.channel.send(new MessageEmbed()
            .setTitle(question)
            .setDescription(choices.map((choice, i) => `${reactions[i]} ${choice}`).join('\n\n')));
        for (let i = 0; i < choices.length; i++)  sent.react(reactions[i]);
    },
};
