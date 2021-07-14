const consoleUtil = require(`../util/console`);
const { performance } = require('perf_hooks');
const bootTime = Math.round(performance.now());
const { loadLanguages, loadPrefix } = require('../../load');
const mongoose = require('mongoose');
const Client = require('../struct/Client');
require('moment-duration-format');
const glob = require('glob');
const express = require('express');
const { getCommands } = require('../util/getCmds');
/**
 * @param {Client} client
 */
module.exports = async (client) => {
  loadLanguages(client, mongoose)
    .then(() => {
      consoleUtil.success('Loaded languages', 'LoadLangs');
    })
    .catch((err) => {
      console.log(err);
    });
    loadPrefix(client)
  .then(() => {
    consoleUtil.success('Loaded prefix', 'LoadPrefix');
  })
  .catch((err) => {
    console.log(err);
  });
  await loadSlashs(client).catch(console.error);
  //client.utils.deleteSlash('856985824235094026');
  //await getApp('692311924448297011', client).commands('847880341736783882').delete()
  const statuses = [
    `Currently on ${client.guilds.cache.size} servers`,
    `Serving ${client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    )} users`,
    `Do you know how to make bots ?`,
    `Don't do drugs kids!`,
    `Is this real life?`,
    `Can I lose my virginity?`,
    `Why am I here`,
    `There's a lot of statuses no?`,
  ];
  setInterval(async () => {
    const i = statuses[Math.floor(Math.random() * statuses.length)];
    await client.user
      .setPresence({
        activity: { name: `${client.prefix}help | ${i}`, type: 'PLAYING' },
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
  // ee
  const app = express();
  const x = {
    guilds: client.guilds.cache.size,
    users: client.guilds.cache.reduce((a, b) => a + b.memberCount, 0),
    channels: client.channels.cache.size,
  };
  app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    res.status(200).sendFile(`${process.cwd()}/src/dash/Main.html`);
  });
  app.use(express.static(`${process.cwd()}/src/dash/`));
  app.get('/about', (req, res) => {
    res.status(200).send(x);
  });
  app.get('/commands', (req, res) => {
    const commands = getCommands(client);
    res
      .status(200)
      .render(`${process.cwd()}/src/dash/ejs/main.ejs`, { commands, client });
  });
  app.listen(client.config.port);
};

async function loadSlashs(client) {
  const files = glob.sync('src/slash_commands' + '/**/*.js');

  files.forEach((file) => {
    /**@type {import('../../types').SlashCommand} */
    const command = require(`${process.cwd()}/${file}`);
    if (command.global === true) {
      client.api.applications(client.user.id).commands.post({
        data: {
          name: command.name,
          description: command.description,
          options: command.commandOptions,
        },
      });
    } else {
      client.api
        .applications(client.user.id)
        .guilds('680811865516933177')
        .commands.post({
          data: {
            name: command.name,
            description: command.description,
            options: command.commandOptions,
          },
        });
    }
    client.slashs.set(command.name, command);
    console.log(
      `Command posted: ${command.name} from ${file} [${
        command.global ? 'global' : 'guild'
      }]`
    );
  });
  const globalCommands = await client.api
    .applications(client.user.id)
    .commands.get();
  const guildCommands = await client.api
    .applications(client.user.id)
    .guilds('680811865516933177')
    .commands.get();
  globalCommands.forEach((globCmd) => {
    console.log(
      `Global command has been loaded: ${globCmd.name} | [${globCmd.id}]`
    );
  });
  guildCommands.forEach((guildCmd) => {
    console.log(
      `Guild command has been loaded: ${guildCmd.name} | [${guildCmd.id}]`
    );
  });
}
