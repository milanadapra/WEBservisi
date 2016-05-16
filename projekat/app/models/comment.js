var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: Date,
    author: {type: Schema.Types.ObjectId, ref: 'User'}
});

commentSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.createdAt = currentDate;
    
    next();
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
