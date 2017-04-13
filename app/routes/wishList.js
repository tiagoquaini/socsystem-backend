module.exports = function(app){

    var BaseController = app.controllers.baseController,
        WishListController = app.controllers.wishList;

    app
      .route('/wishLists/me')
      .post(BaseController.verifyAuthentication, WishListController.postUserWishList)
      .put(BaseController.verifyAuthentication, WishListController.putUserWishList)
      .delete(BaseController.verifyAuthentication, WishListController.deleteUserWishList)
      .get(BaseController.verifyAuthentication, WishListController.getUserWishList);

}
