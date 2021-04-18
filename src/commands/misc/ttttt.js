const { Client, Message, MessageEmbed } = require('discord.js');
// const ship = require("../../../../wikia/json/shiplist.json");
// const folder = require("../../../../wikia/Ships")
module.exports = {
    name: 'al',
    aliases: [],
    description: '',
    category: '',
    utilisation: '{prefix}al',
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
        const query = args.join("_").toLowerCase();
        // const embed = new MessageEmbed()
        //     .setColor('#0099ff')
        //     .setTitle('Azurlane')
        //     .setAuthor(ship[1].name, ship[1].icon)
        //     .setDescription('description')
        //     .setThumbnail(ship[1].icon)
        //     .addField("Rarity", ship[1].rarity, true)
        //     .addField("Ship type", ship[1].shipType, true)
        //     .addField("Hull", ship[1].hull, true)
        //     .addField("Navy", ship[1].navy, true)
        //     .addField("Japanese name", ship[1].nameJP, true)
        //     .addField("Initial stars", ship[1].initialStar, true)
        //     .addField("Voice actress", ship[1].voiceActress, true)
        //     .addField("Aquisition method", ship[1].acquisitionMethod, true)
        //     message.channel.send(embed);

        // const { channel } = message;
        // const embed = new MessageEmbed()
        //     .setColor('#0099ff')
        //     .setTitle('Azurlane')
        //     .setAuthor(query.name, query.icon)
        //     .setDescription('description')
        //     .setThumbnail(query.icon)
        //     .addField("Rarity", query.rarity, true)
        //     .addField("Ship type", query.shipType, true)
        //     .addField("Hull", query.hull, true)
        //     .addField("Navy", query.navy, true)
        //     .addField("Japanese name", query.nameJP, true)
        //     .addField("Initial stars", query.initialStar, true)
        //     .addField("Voice actress", query.voiceActress, true)
        //     .addField("Aquisition method", query.acquisitionMethod, true)
        // channel.send(embed)
        const { channel } = message;
        const details = require(`../../../../wikia/Ships/${query}.json`);
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Azurlane')
            .setAuthor(details.name, details.icon)
            .setDescription("Get all the informations about a ship")
            .setThumbnail(details.icon)
            .addField("Rarity", details.rarity, true)
            .addField("Ship type", details.shipType, true)
            .addField("Hull", details.hull, true)
            .addField("Navy", details.navy, true)
            .addField("Japanese name", details.nameJP, true)
            .addField("Korean name", details.nameCN, true)
            .addField("Initial stars", details.initialStar, true)
            .addField("Voice actress", details.voiceActress, true)
            .addField("Aquisition method", details.acquisitionMethod, true)
            .addField("Build Time", details.buildTime, true)
            .addField("Class", details.class, true)
            .addField("Prefix", details.prefix, true)
        channel.send(embed)
        // for(const file of folder){
        //     const str = require(`../../../../wikia/Ships/${file}`)
        // }
        
        //message.channel.send(tt.name_reference);
    },
};