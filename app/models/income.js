var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var  incomeSchema =new Schema({
	year:Number,
	month:String,
	week:String,
	type:String,
	date:Date,
	Amount:Number,
	user:String,
	incomeComment:String	
});

var income = mongoose.model('income',incomeSchema);

module.exports = income;