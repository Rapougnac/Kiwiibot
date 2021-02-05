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
  console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

};