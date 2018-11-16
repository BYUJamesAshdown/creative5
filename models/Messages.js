var mongoose = require('mongoose');
var MessageSchema = new mongoose.Schema({
    username: String,
	message: String,
});

mongoose.model('Message', MessageSchema);