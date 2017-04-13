module.exports = function( app ){
	var controller = {},
			BaseController = app.controllers.baseController,
			Product = app.models.product;

	controller.postProduct = function(req, res, next){
		BaseController.create(req, res, Product, req.body);
	};

	controller.getProducts = function(req, res, next){
		BaseController.getAll(req, res, Product);
	};

	controller.getProductById = function(req, res, next){
		var sId = req.params.id;
		BaseController.getByProperty(req, res, Product, "_id", sId);
	};

	controller.deleteProductById = function(req, res, next){
		var sId = req.params.id;
		BaseController.deleteByProperty(req, res, Product, "_id", sId);
	};

	controller.putProductById = function(req, res, next){
		var sId = req.params.id;
		BaseController.updateByProperty(req, res, Product, req.body, "_id", sId);
	};

	return controller;
}
