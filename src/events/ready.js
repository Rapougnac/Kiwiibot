const path = require('path');
const { getCommands } = require('../util/index');
const consoleUtil = require(`../util/console`);
const { performance } = require('perf_hooks');
const bootTime = Math.round(performance.now());
const { loadLanguages } = require('../../language');
const mongoose = require('mongoose');
const Client = require('../struct/Client');
require('moment-duration-format');
/**
 * @param {Client} client
 */
module.exports = async (client) => {
  const slCommands = await getApp('692311924448297011', client).commands.get();
  console.log(slCommands);
  //await getApp('692311924448297011', client).commands('847889828695638086').delete();
  await getApp('692311924448297011', client).commands.post({
    data: {
      name: 'ping',
      description: 'Just a ping command bruh',
    },
  });

  await getApp('692311924448297011', client).commands.post({
    data: {
      name: 'docs',
      description: 'Display the doc of discord.js',
      options: [
        {
          name: 'query',
          description: 'Search Class, or Class#method',
          required: true,
          type: 3,
        },
        {
          name: 'target',
          description: 'User to mention',
          required: false,
          type: 6,
        },
        {
          name: 'source',
          description: 'The source of the documentation',
          required: false,
          type: 3,
          choices: [
            {
              name: 'stable branch (#stable) [default]',
              value: 'stable',
            },
            {
              name: 'master branch (#master)',
              value: 'master',
            },
            {
              name: 'commando framework',
              value: 'commando',
            },
            {
              name: 'rpc - Rich Presence',
              value: 'rpc',
            },
            {
              name: 'akairo - Akairo framework',
              value: 'akairo',
            },
            {
              name: 'akairo-master - Akairo framework (#master)',
              value: 'akairo-master',
            },
            {
              name: 'collection - Util Structure',
              value: 'collection',
            },
          ],
        },
      ],
    },
  });

  await getApp('692311924448297011', client).commands.post({
    data: {
      name: 'avatar',
      description: 'Get the avatar of yourself or the specified user',
      options: [
        {
          name: 'user',
          description: 'User to display',
          required: false,
          type: 6,
        }
      ]
    }
  })
  loadLanguages(client, mongoose)
    .then(() => {
      consoleUtil.success('Loaded languages', 'LoadLangs');
    })
    .catch((err) => {
      console.log(err);
    });
  const statuses = [
    `${client.prefix}help | Currently on ${client.guilds.cache.size} servers`,
    `${client.prefix}help | Serving ${client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    )} users`,
    `${client.prefix}help | Do you know how to make bots ?`,
    `${client.prefix}help | Don't do drugs kids!`,
    `${client.prefix}help | Is this real life?`,
    `${client.prefix}help | Can I lost my virginity?`,
    `${client.prefix}help | Why am I here`,
    `${client.prefix}help | There's a lot of statuses no?`,
  ];
  setInterval(async () => {
    const i = statuses[Math.floor(Math.random() * statuses.length)];
    await client.user
      .setPresence({
        activity: { name: i, type: 'PLAYING' },
        status: client.config.discord.status,
      })
      .catch(console.error);
  }, 1e4);

  consoleUtil.success(
    `Ready on ${
      client.guilds.cache.size
    } servers, for a total of ${client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    )} users`
  );
  const d = new Date(),
    timedate = [
      (d.getMonth() + 1).padLeft(),
      d.getDate().padLeft(),
      d.getFullYear(),
    ].join('/'),
    timehrs = [
      d.getHours().padLeft(),
      d.getMinutes().padLeft(),
      d.getSeconds().padLeft(),
    ].join(':');
  consoleUtil.success(
    `${client.user.username} is now Online! (Loaded in ${bootTime} ms)\n`,
    `${timedate} ${timehrs}`
  );

  //express section------------------------------

  const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.guilds.cache.reduce((a, b) => a + b.memberCount, 0),
    channels: client.channels.cache.size,
  };

  const express = require('express');

  const app = express();

  const port = client.config.PORT;

  app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    res
      .status(200)
      .sendFile(path.join(__dirname, '..', 'pages', 'landingPage.html'));
  });

  app.get('/commands', (req, res) => {
    const commands = getCommands();
    res.status(200).render('commands', { commands });
  });

  app.get('/info', (req, res) => {
    res.status(200).send(clientDetails);
  });

  app.listen(port);
};
/**
 *
 * @param {String} guildID
 * @param {Client} client
 * 
 */
const getApp = (guildID, client) => {
  const app = client.api.applications(client.user.id);
  if (guildID) {
    app.guilds(guildID);
  }
  return app;
};
