const path = require('path')
const { getCommands } = require('../util/index')

module.exports = async (client) => {
  const statuses = [
    `m?help | Currently on ${client.guilds.cache.size} servers`,
    `m?help | Serving ${client.guilds.cache.reduce((acc, gluid) => acc + gluid.memberCount, 0)} users`,
    'm?help | Do you know how to make bots ?',
    'm?help | My creator got a small pp :D',
    'm?help | Don\'t do drugs kids!',
    'm?help | Is this real life?',
    'm?help | Can I lost my virginity?',
    'm?help | Why am I here?',
    'm?help | There\'s a lot of statuses no?', 
  ]
  setInterval( async ()  => {
    const i = statuses[Math.floor(Math.random() * statuses.length)];
    await client.user.setPresence({ activity: { name: i, type: 'PLAYING' }, status: 'dnd' })
    //.then(console.log)
    .catch(console.error)
  }, 1e4)
  console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.guilds.cache.reduce((acc, gluid) => acc + gluid.memberCount, 0)} users`);

  const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.guilds.cache.reduce((acc, gluid) => acc + gluid.memberCount, 0),
    channels: client.channels.cache.size
  }

  //express section------------------------------

  const express = require('express');

  const app = express();

  const port = 2000 || 3000;

  app.set('view engine', "ejs")

  app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "..", "pages", "landingPage.html"))

  });

  app.get('/commands', (req, res) => {
    const commands = getCommands();
    res.status(200).render('commands', { commands })
  });

  app.get('/info', (req, res) => {
    res.status(200).send(clientDetails)
  });

  app.listen(port)


};