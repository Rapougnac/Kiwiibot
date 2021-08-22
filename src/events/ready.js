const { Event, Client } = require('../struct/main');
const consoleUtil = require(`../util/console`);
const { performance } = require('perf_hooks');
const bootTime = Math.round(performance.now());
const { loadLanguages, loadPrefix } = require('../../load');
const mongoose = require('mongoose');
const glob = require('glob');
const express = require('express');
const { getCommands } = require('../util/getCmds');
const path = require('path');
module.exports = class ReadyEvent extends Event {
  constructor(client) {
    super(client, {
      once: true,
      name: 'ready',
    });
  }
  async execute() {
    loadLanguages(this.client, mongoose)
      .then(() => {
        consoleUtil.success('Loaded languages', 'LoadLangs');
      })
      .catch((err) => {
        console.log(err);
      });
    loadPrefix(this.client)
      .then(() => {
        consoleUtil.success('Loaded prefix(es)', 'LoadPrefix');
      })
      .catch((err) => {
        console.log(err);
      });
    await loadSlashs(this.client).catch(console.error);
    // this.client.api.applications(this.client.user.id).commands('').delete();
    // this.client.api.applications(this.client.user.id).guilds('692311924448297011').commands('').delete();
    const statuses = [
      `Currently on ${this.client.guilds.cache.size} servers`,
      `Serving ${this.client.guilds.cache.reduce(
        (a, b) => a + b.memberCount,
        0
      )} users`,
      `Do you know how to make bots ?`,
      `Don't do drugs kids!`,
      `Is this real life?`,
      `Can I lose my virginity?`,
      `Why am I here`,
      `There's a lot of statuses no?`,
      `Ugh, Kyofu, it rhymes with tofu, so she has to be a fool`,
    ];
    setInterval(async () => {
      const i = statuses[Math.floor(Math.random() * statuses.length)];
      this.client.user
        .setPresence({
          activities: [{
            name: `${this.client.prefix}help | ${i}`,
            type: 'PLAYING',
          }],
          status: this.client.config.discord.status,
        })
    }, 1e4);

    consoleUtil.success(
      `Ready on ${
        this.client.guilds.cache.size
      } servers, for a total of ${this.client.guilds.cache.reduce(
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
      `${this.client.user.username} is now Online! (Loaded in ${bootTime} ms)\n`,
      `${timedate} ${timehrs}`
    );
    // express
    const app = express();
    const x = {
      guilds: this.client.guilds.cache.size,
      users: this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0),
      channels: this.client.channels.cache.size,
    };
    app.set('view engine', 'ejs');

    app.get('/', (req, res) => {
      res.status(200).sendFile(`${process.cwd()}/src/dash/Main.html`);
    });
    app.use(express.static(`${process.cwd()}/src/dash/`));
    app.get('/about', (req, res) => {
      res.status(200).send(x);
    });
    const { client } = this;
    app.get('/commands', (req, res) => {
      const commands = getCommands(client);
      res
        .status(200)
        .render(`${process.cwd()}/src/dash/ejs/main.ejs`, { commands, client });
    });
    app.listen(this.client.config.port);
  }
};
/**
 * Function to load slashs commands
 * @param {this.client} this.client The this.client
 * @returns {Promise<void>}
 */
async function loadSlashs(client) {
  const files = glob.sync('src/slash_commands/**/*.js');

  files.forEach((file) => {
    /**@type {import('../struct/SlashCommand')} */
    let command = require(`${process.cwd()}/${file}`);
    if (client.utils.isClass(command)) {
      command = new (require(`${process.cwd()}/${file}`))(client);
      if (command.global) {
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
          .guilds('692311924448297011')
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
        `Command posted: ${command.name} from ${path.resolve(
          process.cwd() + path.sep + file
        )} [${command.global ? 'global' : 'guild'}]`
      );
    } else {
      command = null;
    }
  });
  const globalCommands = await client.api
    .applications(client.user.id)
    .commands.get();
  const guildCommands = await client.api
    .applications(client.user.id)
    .guilds('692311924448297011')
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
