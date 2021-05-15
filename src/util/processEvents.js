const Client = require('../struct/Client');
const consoleUtil = require(`./console`);
/**
 * Handle unhandledRejection
 * @param {Error} error The error object
 * @param {*} args other arguments passed through the event
 * @param {Client} client Client
 * @returns {Promise<Message|undefined>}
 */
function unhandledRejection([error, ...args], client) {
  const channel = client.channels.cache.get(client.config.channels.debug);
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

  if (!channel) {
    return Promise.resolve(console.log(error));
  } else {
    // Do nothing
  }

  return channel.send(
    `\\🛠 ${error.name} caught!\n\`The ${timedate} at ${timehrs}\`\n\`\`\`xl\n${error.stack}\`\`\``
  );
}

/**
 * Handle uncaughtException
 * @param {Error} error The error object
 * @param {*} args other arguments passed through the event
 * @returns {Promise<Message|undefined>}
 */
function uncaughtException([error, ...args], client) {
  const channel = client.channels.cache.get(client.config.channels.debug);
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
  if (!channel) {
    return Promise.resolve(console.log(error));
  } else {
    // do nothing
  }

  return channel.send(
    `\\🛠 ${error.name} caught!\n\`At ${timedate} at ${timehrs}\`\n\`\`\`xl\n${error.stack}\`\`\``
  );
}

// registered functions to use
const registers = { unhandledRejection, uncaughtException };

module.exports = function processEvents(event, args, client) {
  if (registers[event]) {
    return registers[event](args, client);
  } else {
    return consoleUtil.warn(
      `Function for process#event \`${event}\` not registered at ${__filename}`,
      '[BOT PROCESS]'
    );
  }
};
