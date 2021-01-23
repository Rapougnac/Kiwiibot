const ping = require("../command_refactor/ping")
module.exports = (client, message) => {
  if (message.content.startsWith("!ping")) {
    return ping(client,message)
  }
}