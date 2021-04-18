const config = require("./config.json")
const options = {
  database: {
    enable: true,
    URI: config.database.URI,
    conf: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    },
  },
}

module.exports = options
