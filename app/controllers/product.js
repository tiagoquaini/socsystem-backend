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
		BaseController.getById(req, res, Product, sId);
	};

	controller.deleteProductById = function(req, res, next){
		var sId = req.params.id;
		BaseController.deleteById(req, res, Product, sId);
	};

	controller.putProductById = function(req, res, next){
		var sId = req.params.id;
		BaseController.updateById(req, res, Product, req.body, sId);
	};

	return controller;
}
