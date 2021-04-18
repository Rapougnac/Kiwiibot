const { MessageEmbed, Message, MessageAttachment, Client} = require("discord.js");
const AmeClient = require('amethyste-api');

module.exports = {
    name: 'trinity',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}trinity',
    cooldown: 5,
    guildOnly: false,
    ownerOnly: false,
    adminOnly: false,
    nsfw: false,
    permissions: [],
    clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES"],
    string: [],
      /**
       * @param {Client} client The client that instantiated this
       * @param {Message} message The global variable
       * @param {String[]} args An array of the content of the message
       */
    async execute(client, message, args) {
        const AmeAPI = new AmeClient(client.config.amethyste.client); {
            const embederr = new MessageEmbed({title: "Error, you must be use tags listed here:", color: "RED", description: "Tags:\n_Basic_\n_Remastered_",  fields: [{ name: "Basic", value: "Three houses in one <:woah:721738699762827314>", inline: true},{ name: 'Remastered', value: "Remastered version"}]})
          const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase());
          if(User){
            if(!(args[1]/*.toLowerCase()*/ === "basic"
            || args[1]/*.toLowerCase()*/ === "remastered")) return message.channel.send(embederr);
          let m =  await message.channel.send("**Please Wait...**");
          const buffer = await  AmeAPI.generate("trinity", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }), type: args[1] });
          const attachment = new MessageAttachment(buffer, "trinity.png");
          m.delete({ timeout: 5000 });
          message.channel.send(attachment);
          }else {
            if(!(args[0]/*.toLowerCase()*/ === "basic"
            || args[0]/*.toLowerCase()*/ === "remastered")) return message.channel.send(embederr);
          let m =  await message.channel.send("**Please Wait...**");
          const buffer = await  AmeAPI.generate("trinity", { url: message.author.displayAvatarURL({ format: "png", size: 2048 }), type: args[0] });
          const attachment = new MessageAttachment(buffer, "trinity.png");
          m.delete({ timeout: 5000 });
          message.channel.send(attachment);
          }
        }
    },
};