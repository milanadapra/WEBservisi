var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// kreiramo novu shemu
var taskSchema = new Schema({
    title : {
        type : String,
        required: true
    },
    description: String,
    author: { type:Schema.Types.ObjectId, ref: 'User'},
    user: { type:Schema.Types.ObjectId, ref: 'User'},
    status: { type:Schema.Types.ObjectId, ref: 'Status'},
    priority: { type:Schema.Types.ObjectId, ref: 'Priority'},
    comments: { type:Schema.Types.ObjectId, ref: 'Comment'},
});

var Task = mongoose.model('Task',taskSchema);

module.exports = Task;