//here the event starts
const { Client } = require("discord.js");
/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    console.log(`${client.user.tag} has been disconnected at ${new Date()}.`)
}