const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
    name: 'rest',
    aliases: [],
    description: '',
    category: 'music',
    utilisation: '{prefix}rest',
    cooldown: 5,
    nsfw: false,
    ownerOnly: false,
    adminOnly: false,
    guildOnly: false,
    permissions: [],
    clientPermissions: [],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        let user = message.mentions.users.first() || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.guild.members.cache.get(args[0]);
        if(!user) {
            user = message.author;
        /**
         * The name of the RPC
         * @type {string}
         */
        const Spotify = 'Spotify';
        /**
         * The type of the RPC
         * @type {string}
         */
        const Type = 'LISTENING';
        if(user.presence.activities[0].name !== Spotify && user.presence.activities[0].type !== Type) return message.channel.send(`I'm detecting no spotify played to the user ${user.username}`)
        const embed = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL({ format: 'png', size: 512, dynamic: true }))
            .setTitle(`Activity of ${user.username}`)
            .setDescription(`Activity:\n\nName: ${user.presence.activities[0].name}\n\nType:${user.presence.activities[0].type}\n\nUrl: ${user.presence.activities[0].url ? user.presence.activities[0].url : 'None'}\n\nDetails: ${user.presence.activities[0].details}\n\nBeginned at: ${user.presence.activities[0].createdAt}`)
            .setThumbnail(user.presence.activities[0].assets.largeImageURL())
            .addField('Song name', user.presence.activities[0].assets.largeText)
            .addField('Flags', user.presence.activities[0].flags)
            .addField('State', user.presence.activities[0].state)
            .addField('Time', user.presence.activities[0].timestamps.start)
        message.channel.send(embed);
        } else {
            user = user.user;
            /**
             * The name of the RPC
             * @type {string}
             */
            const Spotify = 'Spotify';
            /**
             * The type of the RPC
             * @type {string}
             */
            const Type = 'LISTENING';
            if(user.presence.activities[0].name !== Spotify && user.presence.activities[0].type !== Type) return message.channel.send(`I'm detecting no spotify played to the user ${user.username}`)
            const embed = new MessageEmbed()
                .setAuthor(user.tag, user.displayAvatarURL({ format: 'png', size: 512, dynamic: true }))
                .setTitle(`Activity of ${user.username}`)
                .setDescription(`Activity:\n\nName: ${user.presence.activities[0].name}\n\nType:${user.presence.activities[0].type}\n\nUrl: ${user.presence.activities[0].url ? user.presence.activities[0].url : 'None'}\n\nDetails: ${user.presence.activities[0].details}\n\nBeginned at: ${user.presence.activities[0].createdAt}`)
                .setThumbnail(user.presence.activities[0].assets.largeImageURL())
                .addField('Song name', user.presence.activities[0].assets.largeText)
                .addField('Flags', user.presence.activities[0].flags)
                .addField('State', user.presence.activities[0].state)
                .addField('Time', user.presence.activities[0].timestamps.start)
            message.channel.send(embed);
        }
    },
};