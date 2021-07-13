// https://github.com/cordejs/corde
const { group, test, command, beforeStart, afterAll, expect } = require("corde");
const Client = require('../src/struct/Client');

beforeStart(async () => {
    const client = new Client({
        defaultPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'], // Default permissions
        owners: '253554702858452992', // Owner(s) of the bot
        config: require('../config.json'), //Path to the config.json file
        clientOptions: {
            disableMentions: 'everyone', //disables, that the bot is able to send @everyone
        },
    });
    this.client = client;
    const readyPromise = new Promise((resolve) => {
        client.once("ready", () => {
            resolve();
        });
    });

    //Client start
    client.start();
    client.login();

    // Wait the client to be ready
    await readyPromise;

});


group("main commands", () => {
    test("ping command should return latency'", () => {
        expect("ping").toReturn("🏓 Pinging....")
    });
});

afterAll(() => {
    this.client.destroy();
});