module.exports = function( app ){
var controller = {};
var User = app.models.user;


	controller.getUser = function(req, res){
		var id = req.user._id;
		User.findOne({ "_id" : id }).exec()
			.then(
				function(user){
					if(!user)
						throw new Error("Usuario não encontrado");
          delete user.password;
					res.json(user);
				},
				function(error){
					res.status(404).json(error);
				}
			);
	};

	controller.updateUser = function(req, res){
		User.findOne({ 'email' :  req.user.email }, function(err, user){
				if (err)
					throw err;
				else if (user){
					user.name = req.body.name;
					user.email = req.body.email;

					user.save(function(error){
						if (error)
							res.status(500).json(error);
						else
							res.status(200).json(user);
					})
				}
		});
	};

	return controller;
}
