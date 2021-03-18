const config = require("../config.json")
const chatbot = require(`${process.cwd()}/util/chatbot`)
const { Collection } = require("discord.js")

module.exports = (client, message) => {
  const prefix = config.discord.default_prefix.toLowerCase()
  if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot)
    return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if (!client.commands.has(command) && !client.aliases.has(command)) return
  const command_to_execute =
    client.commands.get(command) || client.aliases.get(command)
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
          `Please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${
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
  /*===================CHATBOT FUNCTIONALITY======================*/
  // When bot is mentioned or ?replied to, reply to user with a
  // human precise response possible using external api
  // if chatbot is used, use chatbot_successful as parameter
  // to disable xp gaining and command execution
  const { success: chatbot_successful } = chatbot(message)
  /*===========================================================*/
}
