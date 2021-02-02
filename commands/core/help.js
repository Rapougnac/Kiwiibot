const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {
        const { Menu } = require('discord.js-menu')
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
                        footer: { text: 'Kiwii est un bot développé et maintenu par Rapougnac#0304' },
                        description: `To use filters, ${client.config.discord.prefix}filter (the filter). Example : ${client.config.discord.prefix}filter 8D.`,
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
                        '🔄': 'main',
                        '▶️': 'extra',
                    },
                },
                {
                    name: 'extra',
                    content: new MessageEmbed({
                        color: 'ORANGE',
                        title: 'Help pannel',
                        footer: { text: 'Kiwii est un bot développé et maintenu par Rapougnac#0304' },
                        description: `To use filters, ${client.config.discord.prefix}filter (the filter). Example : ${client.config.discord.prefix}filter 8D.`,
                        fields: [

                            { name: 'Neko', value: neko},
                
                        ]
                    }),
                    reactions: {
                        '◀️': 'main',
                        '🔄': 'main',
                        '▶️': 'nsfw',
                    },
                },
                {
                    name: 'nsfw',
                    content: new MessageEmbed({
                        color: 'ORANGE',
                        title: 'Help pannel',
                        footer: { text: 'Kiwii est un bot développé et maintenu par Rapougnac#0304' },
                        description: `To use filters, ${client.config.discord.prefix}filter (the filter). Example : ${client.config.discord.prefix}filter 8D.`,
                        fields: [
                            
                            { name: 'NSFW', value: nsfw },
                
                        ],
                    }),
                    reactions: {
                        '◀️': 'extra',
                        '🔄': 'main',
                        '▶️': 'interactions',
                    },
                },
                {
                    name: 'interactions',
                    content: new MessageEmbed({
                        color: 'ORANGE',
                        title: 'Help pannel',
                        footer: { text: 'Kiwii est un bot développé et maintenu par Rapougnac#0304' },
                        description: `To use filters, ${client.config.discord.prefix}filter (the filter). Example : ${client.config.discord.prefix}filter 8D.`,
                        fields: [
                            
                            { name: 'Interactions', value: int },
                
                        ],
                    }),
                    reactions: {
                        '◀️': 'nsfw',
                        '🔄': 'main',
                        '▶️': 'interactions',
                    },
                }
            ], 300000);
            helpMenu.start();
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`${client.emotes.error} - I didn't find this command !`);

            message.channel.send({
                embed: {
                    color: 'ORANGE',
                    author: { name: 'Help pannel' },
                    footer: { text: 'Kiwii est un bot développé et maintenu par Rapougnac#0304' },
                    fields: [
                        { name: 'Name', value: command.name, inline: true },
                        { name: 'Category', value: command.category, inline: true },
                        { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join('\n'), inline: true },
                        { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                        { name: 'Description', value: command.description, inline: true },
                    ],
                    timestamp: new Date(),
                    description: 'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
                }
            });
        };
    },
};
