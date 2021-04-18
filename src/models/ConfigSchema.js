const { model, Schema } = require("mongoose");

module.exports = model("config_profile", Schema({
    _id: String,

    roles: {
        muted: {
            type: String,
            default: null
        },
    },

    channels: {
        logs: {
         type: String,
         default: null,
        },
    },

}));