const { MessageEmbed: Embed, Message, version: discordjs_version, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client')
const { version } = require('../../../package.json');
const moment = require('moment');
require("moment-duration-format");

module.exports = {
    name: 'debug',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}debug',
    cooldown: 20,
    nsfw: false,
    guildOnly: false,
    adminOnly: false,
    ownerOnly: false,
    permissions: [],
    clientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        message.channel.send(new Embed({
            color: 'BLUE',
            title: 'Debug infos:',
            fields: [
                { name: 'Bot\'s name and tag', value: client.user.tag },
                { name: 'Version', value:  version },
                { name: 'Server command prefix', value: client.prefix },
                { name: 'Time since last restart', value: duration },
                { name: 'Discord.js Version', value: discordjs_version },
                
            ]
        }))
    },
};