var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// kreiranje nove sheme
var commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
    author: {type: Schema.Types.ObjectId, ref: 'User'}
});

// prilikom snimanja se postavi datum
commentSchema.pre('save', function(next) {
   var currentDate = new Date();

  // postavimo trenutni datum poslednju izmenu
  this.updatedAt = currentDate;

  // ako nije postavljena vrednost za createdAt, postavimo je
  if (!this.createdAt)
    this.createdAt = currentDate;
// predjemo na sledecu funckiju u lancu
  next();
});

// od sheme kreiramo model koji cemo koristiti
var Comment = mongoose.model('Comment', commentSchema);

// publikujemo kreirani model
module.exports = Comment;
