var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(){
	var schema = mongoose.Schema({

		name : {
			type : String,
			required : true
		},
		description : {
			type : String
		},
		price : {
			type : Number
		},
		img : {
			data : Buffer,
			contentType : String
		},
		createdAt : {
			type : Date,
			default : Date.now
		}
	});

	return mongoose.model("Product", schema);
};
