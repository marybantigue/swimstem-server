const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise; // for es2017
mongoose.connect('mongodb://localhost/swimstem', {
  keepAlive: true
});

module.exports.User = require('./user');
module.exports.Team = require('./team');
