const { Structures } = require("discord.js");

Structures.extend("Presence", Presence => {
class CustomPresence extends Presence {
    constructor(client, data){
        super(client, data)
        console.log('Hello World')
    }
    }
    return CustomPresence;
});