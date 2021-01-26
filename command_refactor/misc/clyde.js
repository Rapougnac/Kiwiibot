const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
    name: 'cycle',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}cycle',
    execute(client, message, args) {
        //const args = message.content.trim().split(/ +/g);
        const text = args.slice(1).join(' ')
        if (!text) return message.reply("Please provide text");

        const data = fetch(`
      https://nekobot.xyz/api/imagegen?type=clyde&text=${text}
    `).then((res) => res.json());

        const embed = new Discord.MessageEmbed()
            .setTitle("Clyde")
            .setImage(data.message)
            .setFooter(message.author.username)
            .setColor("BLUE")
            .setDescription(`
        [Click here if the image failed to load.](${data.message})
      `);
        message.channel.send(embed);
    },
};
