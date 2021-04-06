import { Client, Collection } from "discord.js";
import * as mongoose from "mongoose";
import path from "path";
import * as glob from "glob";
import { Config, Command, Events } from "../interfaces/"
import Configjson from "../config.json";
import * as consoleUtil from "./console";
import { readdirSync } from "fs"
let recursive_readdir = function (src, callback) {
  glob(src + "/**/*", callback)
}

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public aliases: Collection<string, Command> = new Collection();
  public config: Config = Configjson;
  public events: Collection<string, Events> = new Collection()
  public async init() {
    this.login(this.config.discord.token);
    if (this.config.database.enable) {
      mongoose.connect(this.config.database.URI, {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: false,
        poolSize: 5,
        family: 4,
      }).then(() => {
        consoleUtil.success("Connected to Mongodb");
      }).catch(err => {
        consoleUtil.error("Failed to connect to MongoDB " + err);
      })
    } else {
      mongoose.disconnect();
      consoleUtil.warn("Database is not enabled! Some commands may cause dysfunctions, please active it in the config.json!");
    };
    recursive_readdir("../commands", function(err, files){
      if(err) {
        consoleUtil.error("Error", err);
      } else {
        files = files.filter((file) => file.endsWith(".js"));
        if(this.config.discord.dev.active){
          if (this.config.discord.dev.include_cmd.length) {
            files = files.filter((file) => file.endsWith(this.config.discord.dev.include_cmd));
          }
          if (this.config.discord.dev.exclude_cmd.length) {
            files = files.filter((file) => !file.endsWith(this.config.discord.dev.exclude_cmd));
          }
        }
        files.forEach((file) => {
          const command = require(`./${file}`);
          this.commands.set(command.name, command);
          if (command.aliases) { command.aliases.forEach((alias) => { this.aliases.set(alias, command); }); }
        });
        consoleUtil.success(`Loaded ${files.length} commands`)
      }
    });
    //Event loader
    const eventPath = path.join(__dirname, "..", "events");
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(`${eventPath}/${file}`);
      this.events.set(event.name, event);
      console.log(event)
      this.on(event.name, event.execute.bind(null, this))
    });
  }
}

export default ExtendedClient;