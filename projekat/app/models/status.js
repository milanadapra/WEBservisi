var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statusSchema = new Schema({
    value: String
});

var Status = mongoose.model('Status',statusSchema);

module.exports = Status;