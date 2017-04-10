var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(){
	var schema = mongoose.Schema({

		user : {
			type : mongoose.Schema.ObjectId,
			ref : "User",
			required : true
		},
		successful : {
			type : Boolean,
			required : true
		}
		createdAt : {
			type : Date,
			default : Date.now
		}
	});

	return mongoose.model("LoginHistory", schema);
};
