const { MessageEmbed, Message } = require("discord.js");
const { Menu } = require('discord.js-menu');
const Client = require('../../struct/Client')
module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    description:'Shows the help pannel or the function of a command',
    utilisation: '{prefix}help <command name>',
    cooldown: 10,
    guildOnly: true,
    adminOnly: false,
    ownerOnly: false,
    nsfw: false,
    permissions: [],
    clientPermissions: ["EMBED_LINKS", "SEND_MESSAGES", "VIEW_CHANNEL"],
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        if (args.length > 2) return;
        if (!args[0]) {

            const infos = message.client.commands.filter(x => x.category == 'Infos').map((x) => '`' + x.name + '`').join(' ');
            const music = message.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(' ');
            const core = message.client.commands.filter(x => x.category == 'Core').map((x) => '`' + x.name + '`').join(' ');
            const neko = message.client.commands.filter(x => x.category == 'Neko').map((x) => '`' + x.name + '`').join(' ');
            const nsfw = message.client.commands.filter(x => x.category == 'Nsfw').map((x) => '`' + x.name + '`').join(' ');
            const int = message.client.commands.filter(x => x.category == 'Interactions').map((x) => '`' + x.name + '`').join(' ');
            const misc = message.client.commands.filter(x => x.category == 'Misc').map((x) => '`' + x.name + '`').join(' ');
            let helpMenu = new Menu(message.channel, message.author.id, [
                {
                    name: 'main',
                    content: new MessageEmbed({
                        color: 'ORANGE',
                        title: 'Help pannel',
                        footer: { text: `1/5`},
                        description: `To use filters, ${client.prefix}filter (the filter). Example : ${client.prefix}filter 8D.`,
                        fields: [
                            
                            { name: "Bot", value: infos },
                            { name: 'Music', value: music },
                            { name: 'Core', value: core },
                            { name: 'Filters', value: client.filters.map((x) => '`' + x + '`').join(' ') },
                            
                        ],
                        timestamp: new Date(),
                    }),
                    reactions: {
                        '◀️': 'main',
                        '▶️': 'extra',
                    },
                },
                {
                    name: 'extra',
                    content: new MessageEmbed({
                        color: 'ORANGE',
                        title: 'Help pannel',
                        footer: { text: 'Page 2/5' },
                        description: `To use filters, ${client.prefix}filter (the filter). Example : ${client.prefix}filter 8D.`,
                        fields: [

                            { name: 'Neko', value: neko},
                
                        ],
                        timestamp: new Date(),
                    }),
                    reactions: {
                        '◀️': 'main',
                        //'🔄': 'main',
                        '▶️': 'nsfw',
                    },
                },
                {
                    name: 'nsfw',
                    content: new MessageEmbed({
                        color: 'ORANGE',
                        title: 'Help pannel',
                        footer: { text: 'Page 3/5' },
                        description: `To use filters, ${client.prefix}filter (the filter). Example : ${client.prefix}filter 8D.`,
                        fields: [
                            
                            { name: 'NSFW', value: nsfw },
                
                        ],
                        timestamp: new Date(),
                    }),
                    reactions: {
                        '◀️': 'extra',
                        //'🔄': 'main',
                        '▶️': 'interactions',
                    },
                },
                {
                    name: 'interactions',
                    content: new MessageEmbed({
                        color: 'ORANGE',
                        title: 'Help pannel',
                        footer: { text: 'Page 4/5' },
                        description: `To use filters, ${client.prefix}filter (the filter). Example : ${client.prefix}filter 8D.`,
                        fields: [
                            
                            { name: 'Interactions', value: int },
                
                        ],
                        timestamp: new Date(),
                    }),
                    reactions: {
                        '◀️': 'nsfw',
                        //'🔄': 'main',
                        '▶️': 'misc',
                    },
                },
                {
                    name: 'misc',
                    content: new MessageEmbed({
                        color: 'ORANGE',
                        title: 'Help pannel',
                        footer: { text: 'Page 5/5' },
                        description: `To use filters, ${client.prefix}filter (the filter). Example : ${client.prefix}filter 8D.`,
                        fields: [
                            
                            { name: 'Misc', value: misc },
                
                        ],
                        timestamp: new Date(),
                    }),
                    reactions: {
                        '◀️': 'nsfw',
                        '▶️': 'misc',
                    },
                },
            ], 300000);
            helpMenu.start();
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`${client.emotes.error} - I didn't find this command !`);

            await message.channel.send({
                embed: {
                    color: 'ORANGE',
                    author: { name: 'Help pannel' },
                    fields: [
                        { name: 'Name', value: command.name, inline: true },
                        { name: 'Category', value: command.category, inline: true },
                        { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join('\n'), inline: true },
                        { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.prefix), inline: true },
                        { name: 'Description', value: command.description, inline: true },
                        { name: "Cooldown", value: command.cooldown ? `${command.cooldown} seconds` : "None", inline: true},
                        { name: "guildOnly", value: command.guildOnly ? true : false, inline: true },
                        { name: "adminOnly", value: command.adminOnly ? true : false, inline: true },
                        { name: "ownerOnly", value: command.ownerOnly ? true : false, inline: true },
                        { name: "User permissions", value: command.permissions.length === 0 ? "None" : command.permissions.map(x => `${x}`), inline: true },
                        { name: "Client permissions", value: command.clientPermissions.length === 0 ? "None" : command.clientPermissions.map(x => `${x}`), inline: true },
                    ],
                    timestamp: new Date(),
                    description: 'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
                }
            });
        }
    },
};
