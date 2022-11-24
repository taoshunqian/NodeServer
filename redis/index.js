"use strict";

var redis = require("redis");
const DATADB = require('../config');

var RedisClient;

try {
  RedisClient = redis.createClient(DATADB.redis.port, DATADB.redis.host, {
    password: DATADB.redis.passwd
  });
} catch (error) {
  console.log(error);
}

module.exports = RedisClient;