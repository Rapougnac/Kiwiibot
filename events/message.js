const chatbot = require(`${process.cwd()}/util/chatbot`)
const config = require("../config.json")
const { Collection, Message, Client } = require("discord.js")
//const prefix = require("../models/PrefixSchema");
const PrefixSchema = require("../models/PrefixSchema")
const moment = require("moment")
const fetch = require("node-fetch")

prefix = async function (message, config) {
  let customprefix

  const data = await PrefixSchema.findOne({
    GuildID: message.guild.id,
  }).catch((error) => console.log(error))

  if (data) {
    customprefix = data.Prefix || config.discord.default_prefix.toLowerCase() || "n?";
  }else if (data){
    customprefix = config.discord.default_prefix.toLowerCase() || data.Prefix;
  }
   else {
    customprefix = config.discord.default_prefix.toLowerCase()
  }
  return customprefix;
}

/**
 * @param {Message} message
 * @param {Client} client
 * @param {String[]} args
 */
module.exports = async (client, message) => {
  const p = await prefix(message, client.config)
  if(message.mentions.members.first()) {
    if(message.mentions.members.first().id === client.user.id) return message.channel.send(`My prefix in ${message.guild.name} is ${p}`)
  }
  if (!message.content.toLowerCase().startsWith(p) || message.author.bot) return
  //if (message.author.bot) return
  const args = message.content.slice(p.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  let command_to_execute = undefined
  //if (!client.commands.has(command) && !client.aliases.has(command)) return
  if (message.content.toLowerCase().startsWith(p)) {
    command_to_execute =
      client.commands.get(command) || client.aliases.get(command)
  }
  if (command_to_execute) {
    const now = Date.now() //get the current time
    const cooldownAmount = (command_to_execute.cooldown || 1) * 1000 //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it ^^
    if (!client.cooldowns.has(message.author.id)) {
      client.cooldowns.set(message.author.id, now)
      setTimeout(
        () => client.cooldowns.delete(message.author.id),
        cooldownAmount
      ) //set a timeout function with the cooldown, so it gets deleted later on again
      try {
        command_to_execute.execute(client, message, args)
      } catch (error) {
        console.error(error)
        message.reply(
          "There was an error trying to execute that command!" + error
        )
      }
    } else {
      const timestamps = client.cooldowns.get(message.author.id) //get the timestamp of the last used commands

      //if the user is on cooldown
      const expirationTime = timestamps + cooldownAmount //get the amount of time he needs to wait until they can run the cmd again

      if (now < expirationTime) {
        //if they're still on cooldonw
        const timeLeft = (expirationTime - now) / 1000 //get the lefttime
        return message.reply(
          `Please wait ${format(timeLeft.toFixed(1))} before reusing the \`${
            command_to_execute.name
          }\` command.`
        )
      } else {
        //client.cooldowns.delete(message.author.id)
        try {
          command_to_execute.execute(client, message, args)
        } catch (error) {
          console.error(error)
          message.reply(
            "There was an error trying to execute that command!" + error
          )
        }
      }
    }
  }

  // When bot is mentioned or ?replied to, reply to user with a
  // human precise response possible using external api
  // if chatbot is used, use chatbot_successful as parameter
  // to disable xp gaining and command execution
//   const { success: chatbot_successful } = chatbot(message)

//   const user = message.mentions.members.first()

//   const mentionregexp = new RegExp(`<@[!?]${client.user.id}>`)

//   // Check the message if the bot's mention was the first on content
//   // or the message was a reply from the bot's previous cached message
//   if (!mentionregexp.test(message.content.split(/ +/).filter(Boolean)[0])){
//     const ref_id = message.reference?.messageID;
//     const ref_msg = message.channel.messages.cache.get(ref_id);
//     if (ref_msg?.author.id !== client.user.id){
//       return Promise.resolve({ success: false });
//     };
//   };

//   const input = message.content.replace(mentionregexp, "")

//   // Check if the user has input other than mention
//   if (message.mentions.members.has(client.user.id)) {
//     return message.channel
//       .send(`How may I help you?`, { replyTo: message })
//       .then(() => {
//         return { success: true }
//       })
//       .catch(() => {
//         return { success: false }
//       })
//   }


//   // if (!input.split(/ +/).filter(Boolean).length) {
//   //   return message.channel
//   //     .send(`How may I help you?`, { replyTo: message })
//   //     .then(() => {
//   //       return { success: true }
//   //     })
//   //     .catch(() => {
//   //       return { success: false }
//   //     })
//   // }

//   // Start typing
//   message.channel.startTyping()

//   // Get a response from the bot via api
//   const res = await fetch(
//     `http://api.brainshop.ai/get?bid=${config.chatbot.id}&key=${
//       config.chatbot.key
//     }&uid=${message.author.id}&msg=${encodeURIComponent(input)}`
//   )
//     .then((res) => res.json())
//     .catch(() => {})

//   // Add a 3s delay
//   await new Promise((_) => setTimeout(() => _(), 3000))

//   // check if we get proper response
//   if (typeof res.cnt !== "string") {
//     return message.channel
//       .send("???", { replyTo: message })
//       .then(() => {
//         message.channel.stopTyping()
//         return { success: true }
//       })
//       .catch(() => {
//         message.channel.stopTyping()
//         return { success: false }
//       })
//   }

//   // send the response
//   return message.channel
//     .send(res.cnt, { replyTo: message })
//     .then(() => {
//       message.channel.stopTyping()
//       return { success: true }
//     })
//     .catch(() => {
//       message.channel.stopTyping()
//       return { success: false }
//     })
}

function format(time) {
  var hrs = ~~(time / 3600)
  var mins = ~~((time % 3600) / 60)
  var secs = ~~time % 60

  var ret = ""
  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "")
  }
  ret += "" + mins + ":" + (secs < 10 ? "0" : "")
  ret += "" + secs
  return `\`${ret}\``
}
