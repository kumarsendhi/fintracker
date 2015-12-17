var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var expCatSchema = new Schema({
	expenditureCategory:String
});

var Expenditures = mongoose.model('Expenditures',expCatSchema);

module.exports = Expenditures;