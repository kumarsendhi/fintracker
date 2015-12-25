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



//mongoose.connect('mongodb://localhost:27017/moneyTracker');
//mongoose.connect('mongodb://MyMongo:2nvX_I5j.TI2zgIloVW7o3sv0vEWWINO6KhPPpqxPs8-@ds034198.mongolab.com:34198/MyMongo');
mongoose.connect(process.env.CUSTOMCONNSTR_DBURL ||'mongodb://localhost:27017/moneyTracker');

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
	else{
		details.find({year:req.params.arg},function (err,docs) {
		if(err){console.log("Error removing Details")}
		console.log(docs);
		res.json(docs);
	});
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
	//details.find({}).populate('expenditures').exec(function(err,docs){
		details.find({}).exec(function(err,docs){
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
		//details.findOne({_id:req.params.id}).populate('expenditures').exec(function(err,docs){
			details.findOne({_id:req.params.id}).exec(function(err,docs){
			if(err){console.log("Error getting Expenditure Category")}
		console.log("Result:" +docs);
		res.json(docs);
		})
	}
	else{
		details.find({year:req.params.id,month:req.params.collection},function (err,docs) {
		if(err){console.log("Error removing Details")}
		console.log(docs);
		res.json(docs);
	});
	}
	
	
});

nodeapp.get('/ExpenseDetails/:year',function(req,res){
	console.log(req.params.year);
})

nodeapp.delete('/ExpenseDetails/:id',function(req,res){
	var id = req.params.id;
	console.log(id);

	details.remove({ _id: req.params.id }, function (err,docs) {
		if(err){console.log("Error removing Details")}
		console.log(docs);
		res.json(docs);
	});
	

	

	
})

nodeapp.put('/ExpenseDetails/:id',jsonParser,function(req,res){
	/**
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({
		query:{_id:mongojs.ObjectId(id)},
		update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
		new:true},function(err,doc){
			res.json(doc);
		}
	)
	**/
	var id = req.params.id;
	console.log(req.body);
	details.findById(req.params.id,function(err,doc){
		if(err){
			console.log("Error getting document");
			return;
		}
		console.log("found for update"+ doc);
		doc.year = req.body.year;
		doc.month =req.body.month;
		doc.week = req.body.week;
		doc.expenditures = req.body.expenditures;
		doc.date = req.body.date;
		doc.Amount = req.body.Amount;
		doc.expenseComment=req.body.expenseComment;
		doc.save(function(err,docs){
		if(err){
			console.log(err);
		}
		else{
			res.json(docs);
		}
	})
			
		
	})
	
})

var host = process.env.URL || 'http://localhost';
var port = process.env.PORT || 8000;


var server = nodeapp.listen(port, function () {
  console.log('Example app listening at http://%s:%s', host, port);
});
