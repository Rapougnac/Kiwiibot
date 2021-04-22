const booru = require("booru")
const { BooruError, sites } = require("booru")
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "r34",
  aliases: [],
  description: "Scrap all images of the r34",
  category: "Nsfw",
  utilisation: "{prefix}r34",
  cooldown: 5,
  async execute(client, message, args) {
    const query = args.join(" ")
    if (message.channel.nsfw) {
      if (query) {
        booru
          .search("rule34", [query], { nsfw: true, limit: 1, random: true })
          .then(booru)
          .then(async (images) => {
              if(images.length === 0) { 
                let msg = await message.channel.send(`No results found for **${query}**!`);
                msg.delete({ timeout: 5000 }) 
              }
              if(query === "LOLI".toLowerCase()) return message.channel.send("Mommy I see a pedo")
            for (let image of images) {
              const embed = new MessageEmbed()
                .setTitle("Rule34:")
                .setDescription(`・ Rating: \`${image.rating}\` (s: 'Safe' q: 'Questionable' e: 'Explicit' u: 'Unrated' | Score: ${image.score})`)
                .attachFiles(image.fileUrl)
                .setImage(`attachment://test.png`)
                .setColor("#FF0000")
                .setFooter(`Tags: ${image.tags.slice(",").join(" | ")}`)
                .setURL(image.fileUrl)
            message.channel.send(embed)
            }
          })
          .catch((err) => {
            if (err instanceof BooruError) {
              return message.channel.send(`No results found for **${query}**!` + err)
            }else {
                return message.channel.send(`No results found for **${query}**!`)
            }
          })
      } else return message.channel.send("Please specify at least one tag")
    } else {
        let m = await message.channel.send("**Warning** this command cannot be used in non-nsfw channels!");
      m.delete({ timeout: 10000 })
    }
  },
}
