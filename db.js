"use strict";
const Datastore = require('nedb');
const _dir = 'data/'
module.exports = (dbName) => new Datastore({filename: `${_dir}${dbName}`});