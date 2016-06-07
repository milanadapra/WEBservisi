
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// kreiramo novu shemu
var taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  entry: {
    type: String,
    required: true
  },
  mark:{
      type:String
    },
  createdBy:{
    type: String
  },
  assignedTo:{
    type:String
  },
  priority:{
    id:{
      type:Number
    },
    name:{
      type:String
    }
  },
  status:{
    id:{
      type:Number
    },
    name:{
      type:String}
  },
  createdAt: Date,
  // napomena! komentari su u ovom primeru implementirani kao reference zbog ilustracije rada sa referencama
  // u realnom sluacju bolje bi bilo implementirati ih kao poddokumente
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  history:[this]
});

// prilikom snimanja se postavi datum
taskSchema.pre('save', function(next) {
  // preuzmemo trenutni datum
  var currentDate = new Date();

  this.createdAt = currentDate;

  // predjemo na sledecu funckiju u lancu
  next();
});

// od sheme kreiramo model koji cemo koristiti
var Task = mongoose.model('Task', taskSchema);

// publikujemo kreirani model
module.exports = Task;
