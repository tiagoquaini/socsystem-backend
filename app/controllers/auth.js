module.exports = function( app ){
var controller = {};
var User = app.models.user;
var LoginHistory = app.models.LoginHistory;

	controller.createLoginHistory = function(user, bSuccessful) {
		return LoginHistory.create({
			user : user,
			successful : bSuccessful
		});
	};


	controller.handleLoginError = function(req, res, mInfo){
		// INFO_CODE 1 = User not found
		// INFO_CODE 2 = Invalid Password
		if (mInfo.INFO_CODE = 2 && mInfo.user) {
			controller._handleInvalidPasswordLogin(req, res, mInfo);
		}

		res.status(401).json(mInfo);
	};

	controller._handleInvalidPasswordLogin = function(req, res, mInfo){
		controller.createLoginHistory(mInfo.user, false)
		.then(function(oLoginHistory){
			
		});
	};

	return controller;
}
