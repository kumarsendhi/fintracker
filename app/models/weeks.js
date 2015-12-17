var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var weekSchema = new Schema({
	week:String
});

var weeks =mongoose.model('weeks',weekSchema);

module.exports = weeks;