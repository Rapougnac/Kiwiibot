const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
module.exports = {
    name: 'a',
    aliases: [],
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
        fetch("https://raw.githubusercontent.com/alg-wiki/wikia/master/json/shiplist.json").then(res => {
            //res.json()
            const { channel } = message;
            console.log(res);
            console.log(res.json())
            channel.send(res.json().body.name)
        }).then(body => {
            const { channel } = message;
            const { name } = body;
            channel.send(name);

        })
    },
};  