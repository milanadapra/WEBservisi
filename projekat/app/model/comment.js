var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// kreiramo novu shemu
var commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  createdAt: Date,
  signedBy: String
});

// prilikom snimanja se postavi datum
commentSchema.pre('save', function(next) {
  // preuzmemo trenutni datum
  var currentDate = new Date();

  this.createdAt = currentDate;

  // predjemo na sledecu funckiju u lancu
  next();
});

// od sheme kreiramo model koji cemo koristiti
var Comment = mongoose.model('Comment', commentSchema);

// publikujemo kreirani model
module.exports = Comment;
