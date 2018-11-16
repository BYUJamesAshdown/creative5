var mongoose = require('mongoose');
var MessageSchema = new mongoose.Schema({
	message: String,
});

mongoose.model('Message', MessageSchema);