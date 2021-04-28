const { model, Schema } = require('mongoose');

module.exports = model('server_profiles', Schema({
  //_id: Schema.Types.ObjectId,
  _id: String,
  guildID: String,
  prefix: { type: String, default: null },
  roles: {
    muted: { type: String, default: null },
  },
  channels: {
    logs: { type: String, default: null },
  }
}, {
  versionKey: false
}));
