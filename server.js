var express = require('express');
var nodeapp = express();
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()



//mongoose.connect('mongodb://localhost:27017/moneyTracker');
//mongoose.connect('mongodb://MyMongo:2nvX_I5j.TI2zgIloVW7o3sv0vEWWINO6KhPPpqxPs8-@ds034198.mongolab.com:34198/MyMongo');
//mongoose.connect(process.env.CUSTOMCONNSTR_DBURL ||'mongodb://localhost:27017/moneyTracker');
//mongoose.connect(process.env.CUSTOMCONNSTR_DBURL ||'mongodb://kprh2010:Seyon2155$@ds040089.mlab.com:40089/fintrackermlab');
mongoose.connect(process.env.CUSTOMCONNSTR_DBURL ||'mongodb://kprh2010:Seyon2155$@ds040089.mlab.com:40089/fintrackermlab');

/** 
fs.readdirSync(__dirname+'/app/models').forEach(function(filename){
	if(~filename.indexOf('expenditures.js')) {
		expenditure =require(__dirname+'/app/models/'+filename)
	}
})
*/



nodeapp.use('/', express.static(__dirname + '/app'));

require('./config/routes')(nodeapp);

var host = process.env.URL || 'http://localhost';
var port = process.env.PORT || 8000;


var server = nodeapp.listen(port, function () {
  console.log('Example app listening at http://%s:%s', host, port);
});
