var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var  detailsSchema =new Schema({
	year:Number,
	month:String,
	week:String,
	expenditures:{type: Schema.ObjectId, ref: 'Expenditures'},
	date:Date,
	Amount:Number	
});

var Details = mongoose.model('Details',detailsSchema);

module.exports = Details;