module.exports = function(app){

    var BaseController = app.controllers.baseController,
        ProductController = app.controllers.product;

    app
      .route('/products')
      .post(BaseController.verifyAuthentication, ProductController.postProduct)
      .get(ProductController.getProducts);

    app
      .route('/products/:id')
      .put(BaseController.verifyAuthentication, BaseController.verifyAdmin, ProductController.putProductById)
      .delete(BaseController.verifyAuthentication, BaseController.verifyAdmin, ProductController.deleteProductById)
      .get(ProductController.getProductById);

}
