var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var monthSchema = new Schema({
	month:String
});

var months = mongoose.model('months',monthSchema);

module.exports =months;