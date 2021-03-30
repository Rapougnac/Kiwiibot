

const { Client, Message, MessageEmbed } = require('discord.js');
const { languages } = require("../../langs.json");
const languageSchema = require("../../models/languageSchema")
module.exports = {
    name: 'setlanguage',
    aliases: ["setlang"],
    description: '',
    category: '',
    utilisation: '{prefix}setlanguage [language]',
    cooldown: 5,
    nsfw: false,
    ownerOnly: false,
    adminOnly: true,
    guildOnly: true,
    permissions: [],
    clientPermissions: [],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {

        const targetedlanguage = args[0].toLowerCase()
        if(!languages.includes(targetedlanguage)) {
            message.reply("This language is not supported yet!");
        }
        try {
            await languageSchema.findOneAndUpdate({
                _id: message.guild.id,
            }, {
                _id: message.guild.id,
                language: targetedlanguage,
            }, {
                upsert: true,
            })

            message.reply("Language has been setted!")
        } catch (error) {
            message.channel.send(`⚠️[DATABASE ERROR] The database responded with the following error: ${error.name} \n${error}`)
        }
    },
};