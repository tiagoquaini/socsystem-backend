module.exports = function(app){

    var BaseController = app.controllers.baseController,
        UserController = app.controllers.user;

    app
      .route('/users')
      .get(BaseController.verifyAuthentication, BaseController.verifyAdmin, UserController.getUsers);

    app
      .route('/users/:id')
      .get(BaseController.verifyAuthentication, BaseController.verifyAdmin, UserController.getUserById)
      .delete(BaseController.verifyAuthentication, BaseController.verifyAdmin, UserController.deleteUserById);
}
