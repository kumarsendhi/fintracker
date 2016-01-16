var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	userName:{ type : String , unique : true,required : true },
	password:{ type : String , required : true}
});

var users = mongoose.model('users',userSchema);

module.exports =users;