module.exports = function( app ){
	var controller = {},
			BaseController = app.controllers.baseController,
			ShoppingCart = app.models.shoppingCart;

	controller.postUserShoppingCart = function(req, res, next){
		var oPayload = {
			user : req.user,
			products : req.body
		}
		BaseController.create(req, res, ShoppingCart, oPayload);
	};

	controller.putUserShoppingCart = function(req, res, next){
		var oPayload = {
			user : req.user,
			products : req.body
		}
		BaseController.updateByProperty(req, res, ShoppingCart, oPayload, "user", req.user);
	};

	controller.getUserShoppingCart = function(req, res, next){
		BaseController.getByPropertyAndPopulate(req, res, ShoppingCart, "user", req.user._id, "products");
	};

	controller.deleteUserShoppingCart = function(req, res, next){
		BaseController.deleteByProperty(req, res, ShoppingCart, "user", req.user._id);
	};

	return controller;
}
