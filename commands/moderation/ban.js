const Discord = require("discord.js");
module.exports = {
    name: 'ban',
    aliases: [],
    description: 'Ban a person',
    category: 'Core',
    utilisation: '{prefix}ban [mention] <raison>',
    async execute(client, message, args) {
        const member = message.mentions.members.first();
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'

        if (!member) {
            return message.channel.send(`\❌ | ${message.author}, User could not be found! Please ensure the supplied ID is valid. Mention user for more precision on pinpointing user.`);
        };

        if (member.id === message.author.id) {
            return message.channel.send(`\❌ | ${message.author}, You cannot ban yourself!`);
        };

        if (member.id === client.user.id) {
            return message.channel.send(`\❌ | ${message.author}, Please don't ban me!`);
        };

        if (member.id === message.guild.ownerID) {
            return message.channel.send(`\❌ | ${message.author}, You cannot ban a server owner!`);
        };


        if (message.member.roles.highest.position < member.roles.highest.position) {
            return message.channel.send(`\❌ | ${message.author}, You can't ban that user! He/She has a higher role than yours`)
        };

        if (!member.bannable) {
            return message.channel.send(`\❌ | ${message.author}, I couldn't ban that user!`);
        };

        await message.channel.send(`Are you sure you want to ban **${member.user.tag}**? (y/n)`)

        const filter = _message => message.author.id === _message.author.id && ['y', 'n', 'yes', 'no'].includes(_message.content.toLowerCase());
        const options = { max: 1, time: 30000, errors: ['time'] };
        const proceed = await message.channel.awaitMessages(filter, options)
            .then(collected => ['y', 'yes'].includes(collected.first().content.toLowerCase()) ? true : false)
            .catch(() => false);

        if (!proceed) {
            return message.channel.send(`\❌ | ${message.author}, cancelled the ban command!`);
        };

        await member.send(`**${message.author.tag}** banned you from ${message.guild.name}!\n**Reason**: ${reason || 'Unspecified.'}`)
            .catch(() => null);

        member.ban({ reason: `${reason || 'Unspecified'}` })
            .then(_member => {
                message.channel.send(`Successfully banned **${_member.user.tag}**`);
                message.guild.channels.cache.get('786674142719377408').send(new Discord.MessageEmbed()
                    .setAuthor(`[BAN] ${_member.user.tag}`, _member.user.displayAvatarURL())
                    .addField('Utilisateur', _member, true)
                    .setColor('#dc143c')
                    .addField('Modérateur', message.author, true)
                    .addField('Raison', reason, true)
                    .addField('Durée', '∞', true));
            })
            .catch(() => message.channel.send(`Failed to ban **${member.user.tag}**!`));
    },
};
