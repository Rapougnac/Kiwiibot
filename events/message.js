const config = require('../config.json');
const chatbot = require(`${process.cwd()}/util/chatbot`);

module.exports = (client, message) => {
    const prefix = config.discord.default_prefix.toLowerCase();
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command) && !client.aliases.has(command)) return;

    try {
        const command_to_execute = client.commands.get(command) || client.aliases.get(command);
        command_to_execute.execute(client, message, args);
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