module.exports = function(){

var router = require("./getRouter");
var mongoose = require("mongoose");

var Project = mongoose.model('Project');
var User = mongoose.model('User');
var Admin = mongoose.model('Admin');

function checkIfAdminLog(req){
      var retVal = "OK";
      if(!req.session.user){
            retVal = "Niste ulogovani";
      }else if(req.session.user != Admin){
            retVal = "Nemate pravo da izvršite ovu akciju.";
      }
      return retVal;
}

/**
 * Kreiranje novog projekta
 */
router.post('/createProject', function(req, resp){  
      var check = checkUser(req);
      if(check != "OK"){
            resp.status(500).end(check);
            return;
      }
     
      var projectName = req.body.name;
      var newProject = new Project();
      newProject.name = req.body.name;
      if(newProject.name.trim() == ""){
            resp.status(500).end("Ime projekta nije zadato.");
            return;
      }
      
      Project.find({name : newProject.name}, function(err, projects){
         if(projects.length == 0){
            newProject.save(function(err, project){
                  if(err){
                        resp.status(500).end("Greška na serveru.");
                  }else{
                         resp.end(JSON.stringify(project));
                  }
            });      
         }else{
               resp.status(500).end("Ime projekta mora biti jedinstveno.");
         }   
      });
});


/**
 * Dodavanje novog korisnika na projekat
 */
router.post('/addUserToProject', function(req, resp){
      
      var check = checkUser(req);
      if(check != "OK"){
            resp.status(500).end(check);
            return;
      } 
      
      var userId = req.body.userId;
      var projectId = req.body.projectId;
      User.findOne({_id : userId}, function(err, user){
            if(!user){
                  resp.status(500).end("Nepoznati korisnik.");
                  return;
            }
            Project.findOne({_id : projectId}, function(err, project) {
                  if(!project){
                        resp.status(500).end("Nepoznati projekat.");
                        return;
                  }
                  user.projects.push(project._id);
                  User.update({_id : userId}, user, function(err){
                        project.users.push(user._id);
                        Project.update({_id : projectId}, project, function(err){
                              resp.end(JSON.stringify(user));
                        });
                  });
            });
      });
});