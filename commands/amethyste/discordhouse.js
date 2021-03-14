const Discord = require("discord.js");
const AmeClient = require('amethyste-api');
const config = require('../../config.json');

module.exports = {
    name: 'house',
    aliases: [],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}house',
    async execute(client, message, args) {
        const AmeAPI = new AmeClient(config.amethyste.client); {
            const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || message.member;
            // const flags = await User.user.fetchFlags()
            // const userFlags = flags.toArray();
            // const test = ["HOUSE_BALANCE", "HOUSE_BRAVERY", "HOUSE_BRILLIANCE"]
            // const houses = ["Brilliance", "Bravery", "Balance"]
            // const tt = test.map((x) => x.replace("HOUSE_", ""));
            // console.log(tt)
            // const zz = User.user.fetchFlags().then(flags => Promise.resolve(Object.entries(flags.serialize()).filter(([_, val]) => !!val))).then(flags => flags.map(([key, _]) => test.find(x => x.name === key && x.replace("HOUSE_", ""))?.toString()))
            //const aa = houses.splice(test)
            //const status = userFlags.find(x => houses.includes("HOUSE_BALANCE", "HOUSE_BRAVERY", "HOUSE_BRILLIANCE"))
            //const bb = aa.forEach(array => console.log(array))
            //const house = zz
            //console.log(aa)
            //console.log(bb)
            // console.log(zz)
            // zz = zz[zz].replace('HOUSE_', "")
            // console.log(zz)
            //var nameHouseAPI = zz.slice(0, 1) + zz.slice(1).toLowerCase()
            // const flags = await User.user.fetchFlags()
            // const userFlags = flags.toArray()
            // const status = userFlags.includes('HYPESQUAD_BALANCE')
            // console.log(status)
            let m =await message.channel.send("**Please Wait...**");
            const buffer = await AmeAPI.generate("discordhouse", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }), /*house: */});
            const attachment = new Discord.MessageAttachment(buffer, "discordhouse.png");
            m.delete({ timeout: 5000 });
            message.channel.send(attachment);
        }
    },
};