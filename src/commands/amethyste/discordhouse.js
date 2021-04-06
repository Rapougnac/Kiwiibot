const { MessageAttachment, Message, Client } = require("discord.js"),
AmeClient = require('amethyste-api');

module.exports = {
    name: 'house',
    aliases: [],
    description: 'Show your avatar with your discord house arround, beautiful isn\'t it?',
    category: 'Misc',
    utilisation: '{prefix}house',
    cooldown: 5,
    guildOnly: false,
    ownerOnly: false,
    adminOnly: false,
    nsfw: false,
    permissions: [],
    clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES"],
    string: [],
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        const AmeAPI = new AmeClient(client.config.amethyste.client); {
            //This is ugly, ik :/
            const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member;
            const zz = await User.user.fetchFlags()
            .then(flags => Promise.resolve(Object.entries(flags.serialize()).filter(([_, val]) => !!val)))
            .then(flags => flags.map(([key, _]) => key))
            .catch(() => []);
            if(!zz[0]) return message.channel.send("You need to have a house!");
            const house = zz[0].replace('HOUSE_', "")
            let nameHouseAPI = house.slice(0, 1) + house.slice(1).toLowerCase()
            let m = await message.channel.send(this.string[0]);
            const buffer = await AmeAPI.generate("discordhouse", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }), house: nameHouseAPI});
            const attachment = new MessageAttachment(buffer, "discordhouse.png");
            m.delete({ timeout: 3000 });
            message.channel.send(attachment);
        }
    },
};