var express = require('express');
var nodeapp = express();
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser')
var expenditure = require('./app/models/expenditures')
var week = require('./app/models/weeks')
var months = require('./app/models/months')
var details = require('./app/models/details')
var jsonParser = bodyParser.json()


mongoose.connect('mongodb://localhost:27017/moneyTracker');

/** 
fs.readdirSync(__dirname+'/app/models').forEach(function(filename){
	if(~filename.indexOf('expenditures.js')) {
		expenditure =require(__dirname+'/app/models/'+filename)
	}
})
*/



nodeapp.use('/', express.static(__dirname + '/app'));

nodeapp.post('/ExpenditureCategory',jsonParser,function(req,res){
	console.log(req.body);
    
	var cat = new expenditure(req.body);
	
	cat.save(function(err,docs){
		if(err){
			console.log(err);
		}
		else{
			res.json(docs);
		}
	})
});

nodeapp.get('/ExpenditureCategory',function(req,res){
	console.log("get of Expenditure");	
	expenditure.find({},function(err,docs){
		if(err){console.log("Error getting Expenditure Category")}
		console.log("Result:" +docs);
		res.json(docs);
	})
});


nodeapp.post('/weekconfig',jsonParser,function(req,res){
	console.log(req.body);
    
	var cat = new week(req.body);
	
	cat.save(function(err,docs){
		if(err){
			console.log(err);
		}
		else{
			res.json(docs);
		}
	})
});

nodeapp.get('/weekconfig',function(req,res){
	console.log("get of week");	
	week.find({},function(err,docs){
		if(err){console.log("Error getting Expenditure Category")}
		console.log("Result:" +docs);
		res.json(docs);
	})
});


nodeapp.post('/MonthConfig',jsonParser,function(req,res){
	
    
	var cat = new months(req.body);
	
	cat.save(function(err,docs){
		if(err){
			console.log(err);
		}
		else{
			res.json(docs);
		}
	})
});

nodeapp.get('/MonthConfig',function(req,res){
		
	months.find({},function(err,docs){
		if(err){console.log("Error getting Expenditure Category")}
		console.log("Result:" +docs);
		res.json(docs);
	})
});


nodeapp.get('/ExpenseDetails:arg', function(req,res){
	if(req.params.arg=="month"){
		months.find({},function(err,docs){
		if(err){console.log("Error getting Expenditure Category")}
		console.log("Result:" +docs);
		res.json(docs);
	})
	}
	else if(req.params.arg=="week"){
		week.find({},function(err,docs){
		if(err){console.log("Error getting Expenditure Category")}
		console.log("Result:" +docs);
		res.json(docs);
	})
	}
	else if(req.params.arg=="expenditure"){
		expenditure.find({},function(err,docs){
		if(err){console.log("Error getting Expenditure Category")}
		console.log("Result:" +docs);
		res.json(docs);
	})
	}
	
});

nodeapp.post('/ExpenseDetails', jsonParser,function(req,res){
	console.log(req.body);
	var det = new details(req.body);
	det.save(function(err,docs){
		if(err){
			console.log(err);
		}
		else{
			res.json(docs);
		}
	})
	
});

nodeapp.get('/ExpenseDetails',function(req,res){
/**
	details.find({},function(err,docs){
		if(err){console.log("Error getting Expenditure Category")}
		console.log("Result:" +docs);
		res.json(docs);
	})
	**/
	details.find({}).populate('expenditures').exec(function(err,docs){
		if(err){console.log("Error getting Expenditure Category")}
		console.log("Result:" +docs);
		res.json(docs);
	})
});

nodeapp.get('/ExpenseDetails/:id/:collection',function(req,res){
	console.log(req.params.id);
	if(req.params.collection =="expenditure"){
		expenditure.findOne({_id:req.params.id},function(err,docs){
		if(err){console.log("Error getting Expenditure Category")}
		console.log(docs);
		res.json(docs);
	})
	}
	else if(req.params.collection =="details"){
		details.findOne({_id:req.params.id}).populate('expenditures').exec(function(err,docs){
			if(err){console.log("Error getting Expenditure Category")}
		console.log("Result:" +docs);
		res.json(docs);
		})
	}
	
	
});

nodeapp.delete('/ExpenseDetails/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	details.remove({ _id: req.params.id }, function (err,docs) {
		if(err){console.log("Error removing Details")}
		console.log(docs);
		res.json(docs);
	});
	

	

	
})




nodeapp.listen(3000);
