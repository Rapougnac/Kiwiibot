module.exports = {
    name: 'r34',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}r34',
    execute(client, message, args) {
        //const quer = message.content.slice(prefix + 'r34')[1]
        //const que = message.content.split(/\s+/g).slice(1).join(" ");
        const arg = message.content.slice(prefix.length + 'r34').trim().split(/ +/g).slice(0);
        const query = arg.join(' ');
        //const qu = args.shift().toLowerCase();

        booru.search('rule34', [query], { nsfw: true, limit: 1, random: true })
            .then(booru.commonfy)
            .then(images => {
                for (let image of images) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Rule34:")
                        .setImage(image.common.file_url)
                        .setColor('#FF0000')
                        .setFooter(`Tags: ${query}`)
                        .setURL(image.common.file_url);
                    return msg.channel.send(embed);
                }

            }).catch(err => {
                if (err.name === 'booruError') {
                    return msg.channel.send(`No results found for **${query}**!`);
                } else {
                    return msg.channel.send(`No results found for **${query}**!`);
                }
            })
        if (!query) return msg.channel.send('Please specify at least one tag')
    },
};
