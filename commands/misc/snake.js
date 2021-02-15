const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'snake',
    description: "Play the famous snake game",
    utilisation: "{prefix}snake",
    aliases: [],
    async execute(client, message, args) {
        const SnakeGame = require('../../struct/SnakeGame');
        const snake = new SnakeGame(client);
        snake.newGame(message);
    },
};