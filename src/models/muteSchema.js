const { model, Schema } = require("mongoose");

const reqString = {
    type: String,
    required: true,
}

const muteSchema = Schema({
    userId: reqString,
    reason: reqString,
    staffId: reqString,
    staffTag: reqString,
    expires: {
        type: Date,
        required: true,
    },
    current: {
        type: Boolean,
        required: true,
    },

}, {
    timestamps: true,
});
module.exports = model("mute", muteSchema)