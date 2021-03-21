const { model, Schema } = require('mongoose');

module.exports = model('server_profiles', Schema({
  _id: String,
  prefix: { type: String, default: null },
  roles: {
    muted: { type: String, default: null }
  },
}, {
  versionKey: false
}));
