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
		senha : {
			type : String,
			required : true
		},
		nome : {
			type : String,
			required : true
		},
		createdAt : {
			type : Date,
			default : Date.now
		}
	});

	// methods ======================
	// generating a hash
	schema.methods.generateHash = function(senha) {
		return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
	};

	// checking if password is valid
	schema.methods.validPassword = function(senha) {
	  return bcrypt.compareSync(senha, this.senha);
	};

	return mongoose.model("Usuario", schema);
};
