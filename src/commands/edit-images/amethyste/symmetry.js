const {
    Message,
    MessageAttachment,
    MessageEmbed,
  } = require("discord.js"),
  AmeClient = require("amethyste-api"),
  Client = require("../../../struct/Client");

module.exports = {
  name: "symmetry",
  aliases: [],
  description: "Symmetry yourself with the tags listed",
  category: "misc",
  utilisation: "{prefix}symmetry [tag]",
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
    const AmeAPI = new AmeClient(client.config.amethyste.client)
    {
      const embederr = new MessageEmbed({
        title: this.string[1],
        color: "RED",
        description:
          "Tags:\n_left-right_\n_right-left_\n_top-bottom_\n_bottom-top_\n_top-left_\n_top-right_\n_bottom-left_\n_bottom-right_",
        fields: [
          {
            name: "left-right",
            value: this.string[2],
            inline: true,
          },
          {
            name: "right-left",
            value: this.string[3],
            inline: true,
          },
          {
            name: "top-bottom",
            value: this.string[4],
            inline: true,
          },
          {
            name: "bottom-top",
            value: this.string[5],
            inline: true,
          },
          {
            name: "top-left",
            value: this.string[6],
            inline: true,
          },
          {
            name: "top-right",
            value: this.string[7],
            inline: true,
          },
          {
            name: "bottom-left",
            value: this.string[8],
            inline: true,
          },
          {
            name: "bottom-right",
            value: this.string[9],
            inline: true,
          },
        ],
      })
      if (!args[0]) return message.channel.send(embederr)

      const User = (message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase() == args.join(" ").toLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase() === args.join(" ").toLowerCase()/* || client.users.fetch(args[0])*/)
      if (!User) {
        if (
          !(
            args[0].toLowerCase() === "left-right" ||
            args[0].toLowerCase() === "right-left" ||
            args[0].toLowerCase() === "top-bottom" ||
            args[0].toLowerCase() === "bottom-top" ||
            args[0].toLowerCase() === "top-left" ||
            args[0].toLowerCase() === "top-right" ||
            args[0].toLowerCase() === "bottom-left" ||
            args[0].toLowerCase() === "bottom-right"
          )
        )
          return message.channel.send(embederr)
        let m = await message.channel.send(this.string[0])
        const buffer = await AmeAPI.generate("symmetry", {
          url: message.author.displayAvatarURL({ format: "png", size: 2048 }),
          orientation: args[0],
        })
        const attachment = new MessageAttachment(buffer, "symmetry.png")
        m.delete({ timeout: 3000 })
        message.channel.send(attachment)
      } else {
        if (
          !(
            args[1].toLowerCase() === "left-right" ||
            args[1].toLowerCase() === "right-left" ||
            args[1].toLowerCase() === "top-bottom" ||
            args[1].toLowerCase() === "bottom-top" ||
            args[1].toLowerCase() === "top-left" ||
            args[1].toLowerCase() === "top-right" ||
            args[1].toLowerCase() === "bottom-left" ||
            args[1].toLowerCase() === "bottom-right"
          )
        )
          return message.channel.send(embederr)
        let m = await message.channel.send(this.string[0])
        const buffer = await AmeAPI.generate("symmetry", {
          url: User.user.displayAvatarURL({ format: "png", size: 2048 }),
          orientation: args[1],
        })
        const attachment = new MessageAttachment(buffer, "symmetry.png")
        m.delete({ timeout: 3000 })
        message.channel.send(attachment)
      }
    }
  },
}
