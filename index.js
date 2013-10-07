'use strict';

var redis = require('redis');

module.exports = function ($youmeb) {

  var client;

  this.on('init', function (config, done) {
    var host = config.get('host') || '127.0.0.1';
    var port = config.get('port') || 6379;
    var pass = config.get('password');

    client = redis.createClient(port, host);
    $youmeb.register('redisClient', client);
    $youmeb.register('redis', redis);
    
    if (pass) {
      client.auth(pass, done);
    } else {
      done();
    }
  });

};
