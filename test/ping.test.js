// https://github.com/cordejs/corde
const { group, test, command, beforeStart, afterAll, expect } = require("corde");
const Client = require('../src/struct/Client');
const Discord = require('discord.js');
const Message = require('./struct/Message');
const TextChannel = require('./struct/TextChannel');
const Guild = require('./struct/Guild');
const { read } = require("jimp");
const exp = require("constants");

beforeStart(async () => {
    const client = new Client({
        defaultPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'], // Default permissions
        owners: '253554702858452992', // Owner(s) of the bot
        config: require('../config.json'), //Path to the config.json file
        clientOptions: {
            disableMentions: 'everyone', //disables, that the bot is able to send @everyone
        },
    });

    const readyPromise = new Promise((resolve) => {
        client.once("ready", () => {
            resolve();
        });
    });

    //Client start
    await client.start();
    await client.login();

    // Wait the client to be ready
    await readyPromise;

});


group("main commands", () => {
    test("ping command should return latency'", () => {
        expect("ping").toReturn("🏓 Pinging....")
    });
});

afterAll(() => {
    client.destroy();
});