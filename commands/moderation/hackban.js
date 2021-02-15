const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'hackban',
    aliases: ['hb'],
    description: 'hackban somebody',
    category: 'Core',
    utilisation: '{prefix}hackban [id] <reason>',
    async execute(client, message, args) {

        if (!message.member.hasPermission("BAN_MEMBERS")) {

            return message.channel.send("Something went wrong, you need the (BAN_MEMBERS) permission");

        }


        let userID = args[0];

        let reason = args.slice(1).join(" ");


        if (!userID) return message.channel.send("Please give me a valid id");

        if (isNaN(userID)) return message.channel.send("id must be a number");

        if (userID === message.author.id) return message.channel.send("You can't ban yourself");

        if (userID === client.user.id) return message.channel.send("You can't ban me");


        if (!reason) reason = "No reason provided";


        client.users.fetch(userID).then(async user => {

            await message.guild.members.ban(user.id, { reason: reason });

            return message.channel.send(`**${user.tag}** has been hackbanned`);

        }).catch(error => {
            return message.channel.send(`Something went wrong: **${error}**`);
        });
        client.users.fetch(userID).then(async user => {
            const embed = new MessageEmbed()
            .setAuthor(`${user.username} (${user.id})`)
            .setColor('#dc143c')
            .setDescription(`**Action**: hackban\n**Raison**: ${reason}`)
            .setThumbnail(user.avatarURL())
            .setTimestamp()
            .setFooter(user.username, user.avatarURL())
            client.channnels.cache.get('786674142719377408').send(embed)
        });

    },
};
