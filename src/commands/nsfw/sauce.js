require('moment-duration-format');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { API } = require('nhentai-api');
const api = new API();

module.exports = {
    name: 'sauce',
    category: 'Nsfw',
    aliases: ['gimmesauce', 'finddoujin', 'doujin', 'nhentai', 'saucefor'],
    description: 'Fetch doujin information from <:nhentai:808384048635445278> [nHentai](https://nhentai.net "nHentai Homepage")',
     async execute(client, message, [id]) {
         if(message.channel.nsfw){

        if (isNaN(id)) {
            client.commands.cooldowns.get(this.name).users.delete(message.author.id);
            return message.channel.send(`<:cancel:767062250279927818> | ${message.author}, Please provide a valid **Sauce**.`);
        };

        const prompt = new MessageEmbed()
            .setColor('YELLOW')
            .setThumbnail('https://i.imgur.com/u6ROwvK.gif')
            .setDescription(`Searching for **${id}** on <:nhentai:767062351169323039> [nHentai.net](https:/nhentai.net 'nHentai Homepage').`)
            .setFooter(`Doujin Query | \©️${new Date().getFullYear()} Kiwii`);

        const msg = await message.channel.send(prompt);
        const book = await api.getBook(id).catch(() => null);

        if (!book) {
            prompt.setColor('RED')
                .setAuthor('None Found', 'https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
                .setDescription(`**${message.member.displayName}**, couldn't find doujin with sauce **${id}**.`)
                .setThumbnail('https://i.imgur.com/qkBQB8V.png')

            return await msg.edit(prompt).catch(() => null) || message.channel.send(prompt);
        };

        const { title: { english, japanese, pretty },
            tags, pages, uploaded, cover } = book

        const embed = new MessageEmbed()
            .setColor('GREY')
            .setFooter(`Doujin Query | \©️${new Date().getFullYear()} Kiwii`)
            .setAuthor(pretty, null, `https://nhentai.net/g/${id}`)
            .setDescription(`**${book.title.english}**\n*${book.title.japanese}*`)
            .setThumbnail(api.getImageURL(cover))
            .addFields([
                { name: 'TAGS', value: book.tags.map(m => m.name).sort().join(', ') },
                { name: 'PAGES', value: book.pages.length, inline: true },
                {
                    name: 'Uploaded on',
                    value: [
                        moment(book.uploaded).format('dddd Do MMMM YYYY'), '\n',
                        moment.duration(Date.now() - book.uploaded).format('Y [Years] M [Months, and] D [Days]'),
                        ' ago.'
                    ].join(''),
                    inline: true
                }, {
                    name: '\u200b',
                    value: [
                        `[\`[LINK]\`](https://nhentai.net/g/${id} `,
                        `'Click here to proceed to ${book.title.pretty}\'s nHentai Page')`
                    ].join(''),
                    inline: true
                }
            ]);

        return await msg.edit(embed).catch(() => null) || message.channel.send(embed);
         }else {
            let m = await message.channel.send("**Warning** this command cannot be used in non-nsfw channels!");
            m.delete({ timeout: 10000 })
         }
    }
}