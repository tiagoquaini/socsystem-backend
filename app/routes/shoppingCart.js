module.exports = function(app){

    var BaseController = app.controllers.baseController,
        ShoppingCartController = app.controllers.shoppingCart;

    app
      .route('/shoppingCart/me')
      .post(BaseController.verifyAuthentication, ShoppingCartController.postUserShoppingCart)
      .put(BaseController.verifyAuthentication, ShoppingCartController.putUserShoppingCart)
      .delete(BaseController.verifyAuthentication, ShoppingCartController.deleteUserShoppingCart)
      .get(BaseController.verifyAuthentication, ShoppingCartController.getUserShoppingCart);

}
