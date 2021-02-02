const { MessageEmbed } = require('discord.js')
const { version } = require('../../package.json')
const moment = require('moment');
require("moment-duration-format");

module.exports = {
    name: 'debug',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}debug',

    async execute(client, message,args) {
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        message.channel.send(new MessageEmbed ({
            color: 'BLUE',
            title: 'Debug infos:',
            description: 'Infos about the bot',
            fields: [
                { name: 'Bot\'s name and tag', value: client.user.tag },
                { name: 'Version', value:  version },
                { name: 'Server command prefix', value: 'm?' },
                { name: 'Time since last restart', value: `${duration}` },
                
            ]
        }))
    },
};