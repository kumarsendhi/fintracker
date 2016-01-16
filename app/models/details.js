var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var  detailsSchema =new Schema({
	year:Number,
	month:String,
	week:String,
	//expenditures:{type: Schema.ObjectId, ref: 'Expenditures'},
	expenditures:String,
	date:Date,
	Amount:Number,
	user:String,
	expenseComment:String	
});

var Details = mongoose.model('Details',detailsSchema);

module.exports = Details;