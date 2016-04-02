var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var paymentModeSchema = new Schema({
	paymentMode:String
});

var paymentmode = mongoose.model('paymentmode',paymentModeSchema);

module.exports = paymentmode;