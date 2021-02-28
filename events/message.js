const config = require('../config.json');
const chatbot = require(`${process.cwd()}/util/chatbot`);

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

    try {
        const command_to_execute = client.commands.get(command) || client.aliases.get(command);
        command_to_execute.execute(client, message, args);
        if(command_to_execute !== client.commands.get(command) || client.aliases.get(command)){
          return message.channel.send(`I've didn't find a command called \`${command_to_execute}\``)
        }
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!' + error);
    }
    /*===================CHATBOT FUNCTIONALITY======================*/
  // When bot is mentioned or ?replied to, reply to user with a
  // human precise response possible using external api
  // if chatbot is used, use chatbot_successful as parameter
  // to disable xp gaining and command execution
  const { success: chatbot_successful } = chatbot(message);
  /*===========================================================*/
};