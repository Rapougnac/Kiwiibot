const Client = require('./src/struct/Client'); // Extended Client
require('./src/struct/Message'); // Extended Message
require('module-alias/register'); // Module alias for the path
const client = new Client({
  defaultPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'], // Default permissions
  owners: '253554702858452992', // Owner(s) of the bot
  config: require('./config.json'), //Path to the config.json file
  disabledEvents: ['channelUpdate', 'channelCreate', 'guildMemberUpdate'],
  clientOptions: {
    disableMentions: 'everyone', //disables, that the bot is able to send @everyone
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  },
});
//Client start
client.start();
//client initalization
client.login();

client.listentoProcessEvents(['uncaughtException', 'unhandledRejection'], {
  log_on_console: true,
  nologs: false,
  logsonboth: false,
});

