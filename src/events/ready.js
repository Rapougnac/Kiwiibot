const path = require('path');
const { getCommands } = require('../util/index');
const consoleUtil = require(`../util/console`);
const { performance } = require('perf_hooks');
const bootTime = Math.round(performance.now());
const { loadLanguages } = require('../../language');
const mongoose = require('mongoose');
const moment = require('moment');
require('moment-duration-format');

module.exports = async (client) => {
  loadLanguages(client, mongoose).then(() => {consoleUtil.success('Loaded languages', 'LoadLangs')}).catch(err =>  {
    console.log(err)
  })
  const statuses = [
    `m?help | Currently on ${client.guilds.cache.size} servers`,
    `m?help | Serving ${client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    )} users`,
    'm?help | Do you know how to make bots ?',
    'm?help | My creator got a small pp :D',
    "m?help | Don't do drugs kids!",
    'm?help | Is this real life?',
    'm?help | Can I lost my virginity?',
    'm?help | Why am I here?',
    "m?help | There's a lot of statuses no?",
  ];
  setInterval(async () => {
    const i = statuses[Math.floor(Math.random() * statuses.length)];
    await client.user
      .setPresence({ activity: { name: i, type: 'PLAYING' }, status: 'dnd' })
      .catch(console.error);
  }, 1e4);

  //client.guildProfiles.load();
  consoleUtil.success(
    `Ready on ${
      client.guilds.cache.size
    } servers, for a total of ${client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    )} users`
  );
  const d = new Date(),
  timedate =
    [
      (d.getMonth() + 1).padLeft(),
      d.getDate().padLeft(),
      d.getFullYear(),
    ].join('/'),
  timehrs = 
  [
    d.getHours().padLeft(),
    d.getMinutes().padLeft(),
    d.getSeconds().padLeft(),
  ].join(':');
  consoleUtil.success(
    `${client.user.username} is now Online! (Loaded in ${bootTime} ms)\n`, `${timedate} ${timehrs}`
  );

  //express section------------------------------

  const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    ),
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
