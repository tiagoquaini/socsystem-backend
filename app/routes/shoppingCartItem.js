var mongoose = require('mongoose');

module.exports = function(){
	var schema = mongoose.Schema({

		product : {
			type : mongoose.Schema.ObjectId,
			ref : "Product"
		},
		quantity : {
			type : Number,
			required : true,
			default : 1
		},
		createdAt : {
			type : Date,
			default : Date.now
		}
	});

	return mongoose.model("ShoppingCartItem", schema);
};
