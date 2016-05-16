var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// kreiramo novu shemu
var projectSchema = new Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    users: [{ type:Schema.Types.ObjectId, ref: 'User'}],
    tasks: [{ type:Schema.Types.ObjectId, ref : 'Task'}]
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;