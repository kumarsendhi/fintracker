"use strict";

var expenditure = require('../app/models/expenditures')
var week = require('../app/models/weeks')
var months = require('../app/models/months')
var details = require('../app/models/details')
var users = require('../app/models/user')
var bodyParser = require('body-parser')
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var jsonParser = bodyParser.json()


module.exports = function (nodeapp) {
	nodeapp.use(require('cookie-parser')());
	nodeapp.use(require('body-parser').urlencoded({ extended: true }));
	nodeapp.use(require('express-session')({ secret: 'secret', resave: false, saveUninitialized: false }));

	nodeapp.use(passport.initialize());
	nodeapp.use(passport.session());
	
	/**
	var user = new users({'userName':'Kamal','password':'Kamal'})
	user.save(function(err){
		console.log('done');
	})
**/

	nodeapp.post('/ExpenditureCategory', jsonParser, function (req, res) {
		console.log(req.body);

		var cat = new expenditure(req.body);

		cat.save(function (err, docs) {
			if (err) {
				console.log(err);
			}
			else {
				res.json(docs);
			}
		})
	});

	passport.use(new Strategy(
		function (username, password, cb) {
			users.findOne({ userName: username }).exec(function (err, user) {
				if (err) { return cb(err); }
				if (!user) { return cb(null, false); }
				if (user.password != password) { return cb(null, false); }
				return cb(null, user);
			})
		}));

	passport.serializeUser(function (user, cb) {
		cb(null, user.userName);
	});

	passport.deserializeUser(function (username, cb) {
		users.findOne({ userName: username }).exec(function (err, user) {
			if (err) { return cb(err); }
			cb(null, user);
		});
	});
	
	// route to log out
	nodeapp.post('/logout', function (req, res) {
		req.logOut();
		res.send(200);
	});
	
	// route to test if the user is logged in or not
	nodeapp.get('/loggedin', function (req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});
/**	
	nodeapp.post('/login', jsonParser, function (req, res) {
		console.log(req.body);
		passport.authenticate('local',{ failureRedirect: '/' });
	},function(req,res){
		res.redirect('/');
	})
		

nodeapp.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.json({'message':"Authentication Failed"}) }
        else{
			res.json({'user':user.userName})
		}
    })(req, res, next);
});
**/	
	nodeapp.post('/login',
		passport.authenticate('local'),
		function (req, res) {
			res.json({'user':req.user.userName})
		});	
/**
	nodeapp.post('/login',
		passport.authenticate('local', { failureRedirect: '/' }),
		function (req, res) {
			res.redirect('/');
		});


nodeapp.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.send({
          message: 'no user'
        });
      }
      req.login(user, function(err) {
        if (err) {
          return next(err);
        }
        res.send({
          message: 'logged in'
        });
      });
    })(req, res, next);
  });
**/
	nodeapp.get('/ExpenditureCategory', function (req, res) {
		console.log("get of Expenditure");
		expenditure.find({}, function (err, docs) {
			if (err) { console.log("Error getting Expenditure Category") }
			console.log("Result:" + docs);
			res.json(docs);
		})
	});


	nodeapp.post('/weekconfig', jsonParser, function (req, res) {
		console.log(req.body);

		var cat = new week(req.body);

		cat.save(function (err, docs) {
			if (err) {
				console.log(err);
			}
			else {
				res.json(docs);
			}
		})
	});

	nodeapp.get('/weekconfig', function (req, res) {
		console.log("get of week");
		week.find({}, function (err, docs) {
			if (err) { console.log("Error getting Expenditure Category") }
			console.log("Result:" + docs);
			res.json(docs);
		})
	});


	nodeapp.post('/MonthConfig', jsonParser, function (req, res) {


		var cat = new months(req.body);

		cat.save(function (err, docs) {
			if (err) {
				console.log(err);
			}
			else {
				res.json(docs);
			}
		})
	});

	nodeapp.get('/MonthConfig', function (req, res) {

		months.find({}, function (err, docs) {
			if (err) { console.log("Error getting Expenditure Category") }
			console.log("Result:" + docs);
			res.json(docs);
		})
	});


	nodeapp.get('/ExpenseDetails:arg', function (req, res) {
		if (req.params.arg == "month") {
			months.find({}, function (err, docs) {
				if (err) { console.log("Error getting Expenditure Category") }
				console.log("Result:" + docs);
				res.json(docs);
			})
		}
		else if (req.params.arg == "week") {
			week.find({}, function (err, docs) {
				if (err) { console.log("Error getting Expenditure Category") }
				console.log("Result:" + docs);
				res.json(docs);
			})
		}
		else if (req.params.arg == "expenditure") {
			expenditure.find({}, function (err, docs) {
				if (err) { console.log("Error getting Expenditure Category") }
				console.log("Result:" + docs);
				res.json(docs);
			})
		}
		else {
			details.find({ year: req.params.arg }, function (err, docs) {
				if (err) { console.log("Error removing Details") }
				console.log(docs);
				res.json(docs);
			});
		}

	});

	nodeapp.post('/ExpenseDetails', jsonParser, function (req, res) {
		console.log(req.body);
		var det = new details(req.body);
		det.save(function (err, docs) {
			if (err) {
				console.log(err);
			}
			else {
				res.json(docs);
			}
		})

	});
	
	nodeapp.post('/signin', jsonParser, function (req, res) {
		console.log(req.body);
		var user = new users(req.body);
		user.save(function (err, docs) {
			if (err) {
				console.log(err);
				res.status(400).send(err.message);;
			}
			else {
				res.json(docs);
			}
		})

	});

	nodeapp.post('/RestoreData', jsonParser, function (req, res) {
		console.log(req.body.length);
		details.collection.insert(req.body, function (err, docs) {
			if (err) { console.log("Error getting Expenditure Category") }
			console.log("Result:" + docs);
			res.json(docs);
		})
	});

	nodeapp.get('/ExpenseDetails', function (req, res) {
		/**
			details.find({},function(err,docs){
				if(err){console.log("Error getting Expenditure Category")}
				console.log("Result:" +docs);
				res.json(docs);
			})
			**/
		//details.find({}).populate('expenditures').exec(function(err,docs){
		details.find({}).exec(function (err, docs) {
			if (err) { console.log("Error getting Expenditure Category") }
			console.log("Result:" + docs);
			res.json(docs);
		})
	});

	nodeapp.get('/ExpenseDetails/:id/:collection/:user', function (req, res) {
		console.log(req.params.id);
		if (req.params.collection == "expenditure") {
			expenditure.findOne({ _id: req.params.id }, function (err, docs) {
				if (err) { console.log("Error getting Expenditure Category") }
				console.log(docs);
				res.json(docs);
			})
		}
		else if (req.params.collection == "details") {
			//details.findOne({_id:req.params.id}).populate('expenditures').exec(function(err,docs){
			details.findOne({ _id: req.params.id }).exec(function (err, docs) {
				if (err) { console.log("Error getting Expenditure Category") }
				console.log("Result:" + docs);
				res.json(docs);
			})
		}
		else {
			details.find({ year: req.params.id, month: req.params.collection,user:req.params.user }, function (err, docs) {
				if (err) { console.log("Error removing Details") }
				console.log(docs);
				res.json(docs);
			});
		}


	});

	nodeapp.get('/ExpenseDetails/:year', function (req, res) {
		console.log(req.params.year);
	})

	nodeapp.delete('/ExpenseDetails/:id', function (req, res) {
		var id = req.params.id;
		console.log(id);

		details.remove({ _id: req.params.id }, function (err, docs) {
			if (err) { console.log("Error removing Details") }
			console.log(docs);
			res.json(docs);
		});





	})

	nodeapp.put('/ExpenseDetails/:id', jsonParser, function (req, res) {
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
		details.findById(req.params.id, function (err, doc) {
			if (err) {
				console.log("Error getting document");
				return;
			}
			console.log("found for update" + doc);
			doc.year = req.body.year;
			doc.month = req.body.month;
			doc.week = req.body.week;
			doc.expenditures = req.body.expenditures;
			doc.date = req.body.date;
			doc.Amount = req.body.Amount;
			doc.expenseComment = req.body.expenseComment;
			doc.save(function (err, docs) {
				if (err) {
					console.log(err);
				}
				else {
					res.json(docs);
				}
			})


		})

	})

}