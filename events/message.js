const config = require('../config.json');
const chatbot = require(`${process.cwd()}/util/chatbot`);
const { Collection } = require("discord.js");

module.exports = (client, message) => {
    //const serverprefix = client.guildProfiles.get(message.guild?.id)?.prefix || 'Not set'
    const prefix = config.discord.default_prefix.toLowerCase();
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    //let prefix;

    // if (message.content.startsWith('m?')){
    //   prefix = 'm?'
    // } else if (message.content.startsWith(client.config.default_prefix)){
    //   prefix = client.config.default_prefix;
    // } else if (serverprefix && message.content.startsWith(serverprefix)){
    //   prefix = serverprefix;
    // };
    // if (message.author.bot){
    //     return;
    // };
    // if (message.content.toLowerCase() === 'prefix'){
    //     return message.channel.send(`${message.author}, My prefix is \`${client.config.default_prefix}\`, The custom prefix is \`${serverprefix}\`.`)
    // } else {
    // // Do nothing..
    // };
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command) && !client.aliases.has(command)) return;
      const command_to_execute = client.commands.get(command) || client.aliases.get(command);

        if(command_to_execute){
          if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
            client.cooldowns.set(command.name, new Collection());
          }
        const now = Date.now(); //get the current time
        const timestamps = client.cooldowns.get(command_to_execute.name); //get the timestamp of the last used commands
        const cooldownAmount = (command_to_execute.cooldown || 1) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
        if (timestamps.has(message.author.id)) { //if the user is on cooldown
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
      
          if (now < expirationTime) { //if he is still on cooldonw
            const timeLeft = (expirationTime - now) / 1000; //get the lefttime
            return message.reply( `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command_to_execute.name}\` command.`);
          }//Send info message
          timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
        }
        try {
          command_to_execute.execute(client, message, args);
        }
        catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!' + error);
        }
      }else //if the command is not found send an info msg
      return message.reply(`Unkown command, try: **\`${prefix}help\`**`)
    /*===================CHATBOT FUNCTIONALITY======================*/
  // When bot is mentioned or ?replied to, reply to user with a
  // human precise response possible using external api
  // if chatbot is used, use chatbot_successful as parameter
  // to disable xp gaining and command execution
  const { success: chatbot_successful } = chatbot(message);
  /*===========================================================*/
  const serverprefix = client.guildProfiles.get(message.guild?.id)?.prefix || 'Not set';
  if (message.content.toLowerCase() === 'prefix'){
    return message.channel.send(`${message.author}, My prefix is \`${client.config.discord.default_prefix}\`, The custom prefix is \`${serverprefix}\`.`)
  } else {
    // Do nothing..
  };
};