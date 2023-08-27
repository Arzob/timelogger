var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timedb = new Schema({
    time: String
});

module.exports = mongoose.model('Time',timedb);