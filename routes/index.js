var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Message = mongoose.model('Message');

router.get('/messages', function(req, res, next) {
	Message.find(function(err, messages) {
		if (err) return next(err);
		res.json(messages);
	});
});

router.post('/messages', function(req, res, next) {
	var message = new Message(req.body);
	message.save(function(err, message) {
		if (err) return next(err);
		res.json(message);
	});
});

module.exports = router;
