const Discord = require("discord.js");
const Kitsu = require('kitsu.js');

module.exports = {
    name: 'anime',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}anime',
    async execute(client, message, args) {
        //const args = message.content.trim().split(/ +/g);
        const kitsu = new Kitsu();

        if (!args[1]) {
            return message.channel.send("S'il te plaît spécifie un animé !");

        }
        //main part 
        var search = message.content.split(/\s+/g).slice(1).join(" ");
        kitsu.searchAnime(search).then(async result => {
            if (result.length === 0) {
                return message.channel.send(`Aucun résultat pour : **${search}**!`);
            }

            var anime = result[0]

            const embed = new Discord.MessageEmbed()
                .setColor('#FF2050')
                .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
                .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
                .addField('❯\u2000\ Informations', `•\u2000\ **Nom en japonais:** ${anime.titles.romaji}\n\•\u2000\ **Age du public:** ${anime.ageRating}\n\•\u2000\ **NSFW:** ${anime.nsfw ? 'Oui' : 'Non'}`, true)
                .addField('❯\u2000\ Stats', `•\u2000\ **Note globale:** ${anime.averageRating}\n\•\u2000\ **Classement:** ${anime.ratingRank}\n\•\u2000\ **Popularité:** ${anime.popularityRank}`, true)
                .addField('❯\u2000\ Status', `•\u2000\ **Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\ **Début:** ${anime.startDate}\n\•\u2000\ **Fin:** ${anime.endDate ? anime.endDate : "En cours.."}`, true)

                .setThumbnail(anime.posterImage.original, 100, 200);


            return message.channel.send(embed)
        }).catch(err => {
            console.log(err) //cathing error
            return message.channel.send(`Aucun résultat pour : **${search}**!`);
        });
    },
};
