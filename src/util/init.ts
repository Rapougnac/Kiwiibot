import { Client, Collection } from "discord.js";
import * as mongoose from "mongoose";
import path from "path";
import * as glob from "glob";
import { Config } from "../interfaces/Config"
import Configjson from "../config.json";
import * as consoleUtil from "../util/console";
let recursive_readdir = function(src, callback){
    glob(src + "/**/*", callback)
}

class ExtendedClient extends Client {
    public config: Config = Configjson;
    public async init() {
        this.login(this.config.discord.token);
        if(this.config.database.enable){
        mongoose.connect(this.config.database.URI, {
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false,
            poolSize: 5,
            family: 4,
          }).then( () =>{
            consoleUtil.success("Connected to Mongodb");
          }).catch(err => {
            consoleUtil.error("Failed to connect to MongoDB " + err);
          })
        } else {
          mongoose.disconnect();
          consoleUtil.warn("Database is not enabled! Some commands may cause dysfunctions, please active it in the config.json!");
        };
    }
}