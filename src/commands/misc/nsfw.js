const { Message, MessageAttachment,  } = require('discord.js');
const Client = require('../../struct/Client');
const NekoClient = require('nekos.life');
const neko = new NekoClient();
const MessageEmbed = require('../../struct/MessageEmbed')
module.exports = {
    name: 'testnsfw',
    aliases: ['testn'],
    description: '',
    category: '',
    utilisation: '{prefix}',
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
        console.log((await neko.nsfw.trap()).url)
        const x =  (await neko.nsfw.trap()).url
        const y = new MessageEmbed().setTitle().setTitle(x).setTitle('a').setImage(x).setURL(x)
        const { channel } = message;

        channel.send({ embed: y
        });
    },
};