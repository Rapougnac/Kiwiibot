import { Client } from "discord.js";

/**
 * Extended client
 * @extends {Client}
 */
module.exports = class KiwiiClient extends Client {
  /**
   * @param {ClientSettings} [config] 
   */
  constructor(config = {}){
    //super(config.client);

    console.log("Client is loading");

    if(typeof config.discord.default_prefix){
      
    }
  }
}