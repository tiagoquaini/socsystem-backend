module.exports = function( app ){
	var controller = {},
			BaseController = app.controllers.baseController,
			User = app.models.user;

	controller.getUsers = function(req, res, next){
		BaseController.getAll(req, res, User);
	};

	controller.getUserById = function(req, res, next){
		var sId = req.params.id;
		BaseController.getByProperty(req, res, User, "_id", sId);
	};

	controller.deleteUserById = function(req, res, next){
		var sId = req.params.id;
		BaseController.deleteByProperty(req, res, User, "_id", sId);
	};

	return controller;
}
