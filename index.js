'use strict';

var redis = require('redis');

module.exports = function ($youmeb) {

  this.on('init', function (config, done) {
    var host = config.get('host') || '127.0.0.1';
    var port = config.get('port') || 6379;
    var pass = config.get('password');

    $youmeb.register('redis', redis);
    $youmeb.register('redisClient', function (done) {
      var client = redis.createClient(port, host);
      if (pass) {
        client.auth(pass, function (err) {
          done(err, client);
        });
      } else {
        done(null, client);
      }
    });

    done();
  });

};
