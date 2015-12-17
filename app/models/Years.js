var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var yearSchema = new Schema({
	year:String
});

mongoose.model('Years',yearSchema);