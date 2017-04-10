var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(){
	var schema = mongoose.Schema({

		email : {
			type : String,
			required : true,
			index : {
				unique : true
			}
		},
		password : {
			type : String,
			required : true
		},
		name : {
			type : String,
			required : true
		},
		deactivated : {
			type : Boolean,
			default: false
		}
		createdAt : {
			type : Date,
			default : Date.now
		}
	});

	// methods ======================
	// generating a hash
	schema.methods.generateHash = function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	// checking if password is valid
	schema.methods.validPassword = function(password) {
	  return bcrypt.compareSync(password, this.password);
	};

	return mongoose.model("User", schema);
};
