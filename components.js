if(config.database?.enable) {
  mongoose.connect(config.database.uri, {
    //config.database.config,
    useUnifiedTopology: true,
    autoIndex: false,
    poolSize: 5,
    connectTimeoutMS: 10000,
    family: 4,
  }).then(
    consoleUtil.success("Connected to Mongodb").catch(err => {
      consoleUtil.error("Failed to connect to MongoDB " + err);
    })
  )
} else {
  consoleUtil.error("Datbase is not enabeld").catch(err => {
    consoleUtil.error("Critical error!" + err);
  });
};
