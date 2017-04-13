module.exports = function( app ){
	var controller = {},
			BaseController = app.controllers.baseController,
			WishList = app.models.wishList;

	controller.postUserWishList = function(req, res, next){
		var oPayload = {
			user : req.user,
			products : req.body
		}
		BaseController.create(req, res, WishList, oPayload);
	};

	controller.putUserWishList = function(req, res, next){
		var oPayload = {
			user : req.user,
			products : req.body
		}
		BaseController.updateByProperty(req, res, WishList, oPayload, "user", req.user);
	};

	controller.getUserWishList = function(req, res, next){
		BaseController.getByPropertyAndPopulate(req, res, WishList, "user", req.user._id, "products");
	};

	controller.deleteUserWishList = function(req, res, next){
		BaseController.deleteByProperty(req, res, WishList, "user", req.user._id);
	};

	return controller;
}
