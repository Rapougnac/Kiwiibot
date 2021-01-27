const Discord = require("discord.js");
module.exports = {
    name: 'slowmode',
    aliases: ['sm'],
    description: '',
    category: 'Misc',
    utilisation: '{prefix}slowmode <number>',
    execute(client, message, args) {
        //const args = message.content.trim().split(/ +/g)
        const amount = parseInt(args[1])
        if (message.member.hasPermission("MANAGE_CHANNEL"))
            if (isNaN(amount)) return message.channel.send("It doesn't seem to be valid number")
        if (args[1] === amount + "s") {
            message.channel.setRateLimitPerUser(amount)
            if (amount > 1) {
                message.channel.send("slowmode is now " + amount + " seconds")
                return
            }
            else {
                message.channel.send("slowmode is now " + amount + " second")
                return
            }
        } if (args[1] === amount + "min") {
            message.channel.setRateLimitPerUser(amount * 60)
            if (amount > 1) {
                message.channel.send("slowmode is now " + amount + " minutes")
                return
            } else {
                message.channel.send("slowmode is now " + amount + " minute")


                return
            }
        } if (args[1] === amount + "h") {
            message.channel.setRateLimitPerUser(amount * 60 * 60)
            if (amount > 1) {
                message.channel.send("slowmode is now " + amount + " hours")
                return
            } else {
                message.channel.send("slowmode is now " + amount + " hour")
                return
            }
        } else {
            message.channel.send("You can only set seconds(s), minutes(min) and hours(h)")
        }

    },
};
