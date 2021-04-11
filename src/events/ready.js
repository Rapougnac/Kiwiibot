const path = require("path")
const { getCommands } = require("../util/index")
const consoleUtil = require(`../util/console`)
const text = require(`../util/string`)
const { version, author } = require("../../package.json")
const { performance } = require("perf_hooks")
const bootTime = Math.round(performance.now())
// const { logs } = require("config.json");
//const GuildProfilesManager = require("../struct/guilds/ProfileManager")
const { loadLanguages } = require("../../language");

module.exports = async (client) => {
  /**
   * The Guild Profiles manager of the client
   * @type {GuildProfilesManager}
   */

  //client.guildProfiles = new GuildProfilesManager(client)
  loadLanguages(client);
  const statuses = [
    `m?help | Currently on ${client.guilds.cache.size} servers`,
    `m?help | Serving ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users`,
    "m?help | Do you know how to make bots ?",
    "m?help | My creator got a small pp :D",
    "m?help | Don't do drugs kids!",
    "m?help | Is this real life?",
    "m?help | Can I lost my virginity?",
    "m?help | Why am I here?",
    "m?help | There's a lot of statuses no?",
  ];
  setInterval(async () => {
    const i = statuses[Math.floor(Math.random() * statuses.length)]
    await client.user.setPresence({ activity: { name: i, type: "PLAYING" }, status: "dnd" }).catch(console.error)
  }, 1e4)
  //client.guildProfiles.load();
  consoleUtil.success(
    `Ready on ${client.guilds.cache.size} servers, for a total of ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users`
  )

  consoleUtil.success(
    `${client.user.username} is now Online! (Loaded in ${bootTime} ms)\n\n`
  );

  // const bot = client.user.username
  // const icon = "<a:gears_turning:813402972557410305>"
  // const servers = text.commatize(client.guilds.cache.size)
  // const members = text.commatize(
  //   client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
  // )
  // const commands = client.commands.size
  // const boot = bootTime
  // const message = `${icon} \`[ ${version} ]\` **REBOOT**`
  // const embed = {
  //   color: "GREY",
  //   description: `\`\`\`properties\nBot: ${bot}\nServers: ${servers}\nMembers: ${members}\nCommand: ${commands}\nBoot: ${boot}ms\`\`\``
  // }
  // const channel = client.channels.cache.get("806129974011887706");
  // await channel.send(message, { embed: embed });

  //express section------------------------------

  const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.guilds.cache.reduce(
      (acc, gluid) => acc + gluid.memberCount,
      0
    ),
    channels: client.channels.cache.size,
  }

  const express = require("express")

  const app = express()

  const port = 3000 || 3001

  app.set("view engine", "ejs")

  app.get("/", (req, res) => {
    res
      .status(200)
      .sendFile(path.join(__dirname, "..", "pages", "landingPage.html"))
  })

  app.get("/commands", (req, res) => {
    const commands = getCommands()
    res.status(200).render("commands", { commands })
  })

  app.get("/info", (req, res) => {
    res.status(200).send(clientDetails)
  })

  app.listen(port)
}