var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    name: String,
    lastname: String,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;