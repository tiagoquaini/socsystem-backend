var async    = require('async');
var passport = require('passport');
var crypto   = require('crypto');

module.exports = function(app){

    var UserController = app.controllers.user;

    app.post('/auth/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
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
