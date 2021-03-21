const Discord = require("discord.js");
const AmeClient = require('amethyste-api');
const config = require('../../config.json');

module.exports = {
    name: 'symmetry',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}symmetry',
    async execute(client, message, args) {
        const AmeAPI = new AmeClient(config.amethyste.client); {
    
          const embederr = new Discord.MessageEmbed({title: "Error, you must be use tags listed here:", color: "RED", description: "Tags:\n_left-right_\n_right-left_\n_top-bottom_\n_bottom-top_\n_top-left_\n_top-right_\n_bottom-left_\n_bottom-right_",  fields: [{ name: "left-right", value: "The symmetry will be from the left to the right", inline: true},{ name: 'right-left', value: "The symmetry will be from the right to the left", inline: true}, { name: 'top-bottom', value: "The symmetry will be from the top to the bottom", inline: true},{ name: 'bottom-top', value: "The symmetry will be from the bottom to the top", inline: true},{ name: "top-left", value: "The symmetry will be from the top to the left", inline: true},{ name: "top-right", value: "The symmetry will be from the top to the right", inline: true},{ name: "bottom-left", value: "The symmetry will be from the bottom to the left", inline: true},{ name: "bottom-right", value: "The symmetry will be from the bottom to the right", inline: true}],});
          if(!args[0]) return message.channel.send(embederr);
          
          const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase());
          if(!User){
            if(!(args[0].toLowerCase() === "left-right"
            || args[0].toLowerCase() === "right-left"
            || args[0].toLowerCase() === "top-bottom"
            || args[0].toLowerCase() === "bottom-top"
            || args[0].toLowerCase() === "top-left"
            || args[0].toLowerCase() === "top-right"
            || args[0].toLowerCase() === "bottom-left"
            || args[0].toLowerCase() === "bottom-right")) return message.channel.send(embederr);
          let m =  await message.channel.send("**Please Wait...**");
          const buffer = await  AmeAPI.generate("symmetry", { url: message.author.displayAvatarURL({ format: "png", size: 2048 }), orientation: args[0] });
          const attachment = new Discord.MessageAttachment(buffer, "symmetry.png");
          m.delete({ timeout: 5000 });
          message.channel.send(attachment);
          }else {
            if(!(args[1].toLowerCase() === "left-right"
            || args[1].toLowerCase() === "right-left"
            || args[1].toLowerCase() === "top-bottom"
            || args[1].toLowerCase() === "bottom-top"
            || args[1].toLowerCase() === "top-left"
            || args[1].toLowerCase() === "top-right"
            || args[1].toLowerCase() === "bottom-left"
            || args[1].toLowerCase() === "bottom-right")) return message.channel.send(embederr);
            let m =  await message.channel.send("**Please Wait...**");
            const buffer = await  AmeAPI.generate("symmetry", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }), orientation: args[1]});
            const attachment = new Discord.MessageAttachment(buffer, "symmetry.png");
            m.delete({ timeout: 5000 });
            message.channel.send(attachment);
          }
        }
    },
};
