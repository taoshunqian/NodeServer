"use strict";

var redis = require("redis");
const DATADB = require('../config');
const { promisify } = require('util');

var RedisClient;
let promiseRedis;

try {
  RedisClient = redis.createClient(DATADB.redis.port, DATADB.redis.host, {
    password: DATADB.redis.passwd
  });
} catch (error) {
  console.log(error);
}
function promiseRedisFn(client) {
  return {
    exists: promisify(client.exists).bind(client),
    keys: promisify(client.keys).bind(client),
    set: promisify(client.set).bind(client),
    get: promisify(client.get).bind(client),
    del: promisify(client.del).bind(client),
    incr: promisify(client.incr).bind(client),
    decr: promisify(client.decr).bind(client),
    lpush: promisify(client.lpush).bind(client),
    hexists: promisify(client.hexists).bind(client),
    hgetall: promisify(client.hgetall).bind(client),
    hset: promisify(client.hset).bind(client),
    hmset: promisify(client.hmset).bind(client),
    hget: promisify(client.hget).bind(client),
    hincrby: promisify(client.hincrby).bind(client),
    hdel: promisify(client.hdel).bind(client),
    hvals: promisify(client.hvals).bind(client),
    hscan: promisify(client.hscan).bind(client),
    sadd: promisify(client.sadd).bind(client),
    smembers: promisify(client.smembers).bind(client),
    scard: promisify(client.scard).bind(client),
    srem: promisify(client.srem).bind(client)
  }
}

promiseRedis = promiseRedisFn(RedisClient)

module.exports = promiseRedis;