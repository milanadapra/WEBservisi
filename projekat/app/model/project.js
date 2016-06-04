var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// kreiramo novu shemu
var projectSchema = new Schema({
    title: {
        type: String,
        require: true,
        unique: true
      },
    createdOn:{
		  type:Date,
		  default:Date.now,
		  required:true
	 },
    mark:{
      type:String
    },
    counter:{
      default: 1,
      type:Number
    },
    users: [{ type:Schema.Types.ObjectId, ref: 'User'}],
    tasks: [{ type:Schema.Types.ObjectId, ref : 'Task'}]
});

// prilikom snimanja se postavi datum
projectSchema.pre('save', function(next) {
  // preuzmemo trenutni datum
  var currentDate = new Date();

  this.createdAt = currentDate;

  var str = this.title.match(/\b(\w)/g);
    this.mark = str.join('');

  // predjemo na sledecu funckiju u lancu
  next();
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;