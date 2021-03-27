const mongoose = require('mongoose');
const consoleUtil = require(`${process.cwd()}/util/console`);

module.exports = class Mongoose{
  constructor(client, options = {}){

    Object.defineProperty(this, 'client', { value: client })


    this.connector = options.uri;

    this.settings = options.config;


    this.db = mongoose;

    this.connected = false;

    this.db.connection.on('connected', () => this.connected = true);
    this.db.connection.on('disconnect', () => this.connected = false);
  }


  init(){

    this.db.connect(this.connector, this.settings).catch((error) => {
      consoleUtil.error(error.message, 'db');
    });

    this.db.set('useFindAndModify',false)
    this.db.Promise = global.Promise;

    this.db.connection.on('connected', () => consoleUtil.success('Connected to MongoDB!'));

    return this.db;
  };
};