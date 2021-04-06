
const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
    Prefix: String,
    GuildID: String,
});

module.exports = mongoose.model("prefix", PrefixSchema);