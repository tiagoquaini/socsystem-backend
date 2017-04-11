var passport = require('passport');

module.exports = function(app){

    var AuthController = app.controllers.auth;

    app.post('/auth/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, mInfo) {
            if (err) {
                return next(err);
            }

            if (!user) {
              AuthController.handleLoginError(req, res, mInfo);
            } else {
              req.logIn(user, function (err) {
                if (err) {
                  return next(err);
                }
                AuthController.createLoginHistory(user, true);
                res.send(user);
              });
            }
        })(req, res, next);
    });

    app.route('/auth/signup')
        .post(
            function (req, res, next) {
                passport.authenticate('local-signup', function (err, user, info) {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        res.status(401).send(info);
                    } else {
                        req.logIn(user, function (err) {
                            if (err) {
                                return next(err);
                            }
                            res.send(user);
                        });
                    }
                })(req, res, next);
            }
        );

    app.get('/auth/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

}
