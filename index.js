const { APIMessage, MessageEmbed } = require('discord.js');
const axios = require('axios');
const Client = require('./src/struct/Client'); // Extended Client
require('./src/struct/Message'); // Extended Message
require('module-alias/register'); // Module alias for the path
const client = new Client({
  prefix: 'n?', // Prefix of the bot
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
  log_on_console: false,
  nologs: false,
  logsonboth: true,
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
  console.log(interaction);
  const { member } = interaction;
  const { options, name } = interaction.data;
  const command = name.toLowerCase();

  const args = {};
  this.args = args;

  if (options) {
    for (const option of options) {
      const { name, value } = option;
      args[name] = value;
    }
  }

  console.log(args);
  switch (command) {
    case 'ping': {
      reply(
        interaction,
        `🏓 P${'o'.repeat(
          Math.min(Math.round(client.ws.ping / 100), 1500)
        )}ng \n\`${client.ws.ping}ms\``
      );
      break;
    }

    case 'docs': {
      const query = args?.query;
      let source = args?.source;
      const url = `https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${encodeURIComponent(
        query
      )}`;
      if (!source) source = 'stable';
      axios.get(url).then(({ data }) => {
        const embed = new MessageEmbed(data);
        if (data) {
          reply(interaction, embed);
        }
      });
      break;
    }

    case 'avatar': {
      let user = args?.user;
      if (!user) user = member.user.id;
      const u = (await client.users.fetch(user)).displayAvatarURL({
        size: 4096,
        dynamic: true,
        format: 'png',
      });
      reply(interaction, u);
      break;
    }
  }
});

const reply = async (interaction, response) => {
  let data = {
    content: response,
  };

  if (typeof response === 'object') {
    data = await createAPIMessage(interaction, response);
  } 
  if(typeof response === 'object' && this.args?.target){
    data = await createAPIMessage(interaction, response, `Heyy <@!${this.args?.target}> voilà quelque chose qui pourrait t'être utile`)
  }
  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data,
    },
  });
};

const createAPIMessage = async (interaction, content, str) => {
  const { data, files } = await APIMessage.create(
    client.channels.resolve(interaction.channel_id),
    str, content
  )
    .resolveData()
    .resolveFiles();

  return { ...data, files };
};
