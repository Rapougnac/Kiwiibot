const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'chess',
    description: "Play chess",
    utilisation: "{prefix}chess",
    aliases: [],
    async execute(client, message, args) {
        const ChessGame = require('../../struct/ChessGame');
        const chess = new ChessGame(client);
        chess.newGame(message);
    },
};