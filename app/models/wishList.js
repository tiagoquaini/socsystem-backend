var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(){
	var schema = mongoose.Schema({

		user : {
			type : mongoose.Schema.ObjectId,
			ref : "User",
			required : true,
			index : {
				unique : true
			}
		},
		products : [{
			type : mongoose.Schema.ObjectId,
			ref : "Product"
		}],
		createdAt : {
			type : Date,
			default : Date.now
		}
	});

	return mongoose.model("WishList", schema);
};
