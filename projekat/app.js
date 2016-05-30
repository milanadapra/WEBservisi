var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// koristimo mongoose model koju smo kreirali u folderu model
var Task = require(__dirname + '/app/model/task');
var Comment = require(__dirname + '/app/model/comment');
var User        = require(__dirname + '/app/model/user');
var Project = require(__dirname + '/app/model/project');
var passport  = require('passport');
var config = require(__dirname+'/config/database'); // get db config file
var jwt = require('jwt-simple');
require(__dirname + '/config/passport')(passport);


mongoose.connect(config.database);


// konfigurisemo bodyParser()
// da bismo mogli da preuzimamo podatke iz POST zahteva
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var port = process.env.PORT || 8080; // na kom portu slusa server

//ruter za korisnika

var userRouter = express.Router(); // koristimo express Router
// create a new user account (POST http://localhost:8080/api/signup)
userRouter.post('/register', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User(req.body);
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
})
.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
    
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          var resObject = { success: true, token: 'JWT ' + token };
          res.json(resObject);
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
})
.post('/project/:projectId/:userId', passport.authenticate('jwt', { session: false}), function(req, res, next) {

var user = User.findOne({'_id':req.params.userId}, function (err, user) {
Project.findOne({"_id":req.params.projectId},function (err, entry) {
    Project.findByIdAndUpdate(entry._id, {$push:{"users":user._id}}, function (err, entry) {
        if(err) next(err);
        res.json(entry);
      });
    });
  });
})
.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
      if (err) throw err;
      
      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
})
.get('/', function(req, res) {

  User.find().exec(function(err, data, next) {
    res.json(data);
  });
});
var getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

//ruter za project
var projectRouter = express.Router(); //koristimo express Router

//definisanje ruta za projekat
projectRouter
.get('/:id', function(req, res, next) {
  Project.findOne({
    "_id": req.params.id
  }).populate('tasks').exec(function(err, entry) {
      // ako se desila greska predjemo na sledeci middleware (za rukovanje greskama)
      if (err) next(err);
      res.json(entry);
    });
})
.get('/', function(req, res) {

   var entry={};
  if (req.query.title) {
    entry={title: new RegExp(req.query.title, "i")};
  }
  if (req.query.createdOn){
    entry={entry: new RegExp(req.query.createdOn,'i')};
  }
  Project.find(entry).populate('tasks').exec(function(err, data, next) {
    res.json(data);
  });

})
.post('/', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var project = new Project(req.body);
  project.save(function(err, entry) {
    if (err) next(err);
    res.json(entry);
  });
});



// ruter za task
var taskRouter = express.Router(); // koristimo express Router

// definisanje ruta za task
taskRouter
.get('/:id', function(req, res, next) {
  Task.findOne({
    "_id": req.params.id
  }).populate('comments').exec(function(err, entry) {
      // ako se desila greska predjemo na sledeci middleware (za rukovanje greskama)
      if (err) next(err);
      res.json(entry);
    });
})
.get('/', function(req, res) {
  var entry={};
  if (req.query.title) {
    entry={title: new RegExp(req.query.title, "i")};
  }
  if (req.query.entry){
    entry={entry: new RegExp(req.query.entry,'i')};
  }
  Task.find(entry).populate('comments').exec(function(err, data, next) {
    res.json(data);
  });
})
.post('/project/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {

var task = new Task(req.body);
Project.findOne({"_id":req.params.id},function (err, entry) {
  task.save(function(err, task) {
    if (err) next(err);
          Project.findByIdAndUpdate(entry._id, {$push:{"tasks":task._id}}, function (err, entry) {
        if(err) next(err);
        res.json(entry);
      });
    });
  });
})
.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    if(!decoded.role||decoded.role!=='admin'){
      return res.status(403).send({success: false, msg: 'Not allowed.'});    
    }
    Task.findOne({
      "_id": req.params.id
    }, function(err, task) {
      if (err) next(err);
      var newEntry = req.body;
      task.title = newEntry.title;
      task.entry = newEntry.entry;
      task.save(function(err, task) {
        if (err) next(err);
        res.json(task);
      });
    });
  }
  else{
    return res.status(403).send({success: false, msg: 'Not allowed.'});    
  }
})
.delete('/:id', function(req, res, next) {
  Task.remove({
    "_id": req.params.id
  }, function(err, successIndicator) {
    if (err) next(err);
    res.json(successIndicator);
  });
});

// ruter za comments
var commentRouter = express.Router(); // koristimo express Router

commentRouter
.post('/task/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var comment = new Comment(req.body);
  Task.findOne({"_id":req.params.id},function (err, entry) {
    if(err) next(err);
    comment.save(function (err, comment) {
      if(err) next(err);
      Task.findByIdAndUpdate(entry._id, {$push:{"comments":comment._id}}, function (err, entry) {
        if(err) next(err);
        res.json(entry);
      });
    });
  });
})
.delete('/:id', function (req, res, next) {
  Comment.remove({"_id":req.params.id},function (err, successIndicator) {
    if(err) next(err);
    res.json(successIndicator);
  });
});

// dodavanje rutera za user /api/user
app.use('/api/users', userRouter);

app.use('/api/projects', projectRouter);

app.use('/api/tasks', taskRouter);

app.use('/api/comments', commentRouter);
//klijentsku angular aplikaciju serviramo iz direktorijuma client
app.use('/proj', express.static(__dirname + '/client'));
app.use('/lib', express.static(__dirname + '/bower_components'));


//na kraju dodajemo middleware za obradu gresaka
app.use(function(err, req, res, next) {
  var message = err.message;
  var error = err.error || err;
  var status = err.status || 500;

  res.status(status).json({
    message: message,
    error: error
  });
});


// Pokretanje servera
app.listen(port);


console.log('Server radi na portu ' + port);
