module.exports = async (client) => {
  console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);
  await client.user.setPresence({ activity: { name: 'm?help/m?commands', type: 'WATCHING' }, status: 'dnd' })
    .then(console.log)
    .catch(console.error);
  console.log("bot lancé");
};