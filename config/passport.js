var passport 		 = require('passport');
var mongoose 		 = require('mongoose');
var LocalStrategy= require('passport-local').Strategy;

module.exports = function(){

	var Usuario = mongoose.model("Usuario");

	passport.serializeUser(function(usuario, done){
		done(null, usuario._id);
	});

	passport.deserializeUser(function(id, done){
		Usuario.findById(id).exec()
			.then(function(usuario){
				done(null, usuario);
			}
		);
	});


	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'senha',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, senha, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
	        // find a user whose email is the same as the forms email
	        // we are checking to see if the user trying to login already exists
	        Usuario.findOne({ 'email' :  email }, function(err, user) {
	            // if there are any errors, return the error
	            if (err){
                return done(err);
              }
	            // check to see if theres already a user with that email
	            if (user) {
	            	return done(null, false, 'Endereço de email já cadastrado.');
	            } else {
	                // if there is no user with that email
	                // create the user
	                var newUser = new Usuario();
	                // set the user's local credentials
	                newUser.email = email;
	                newUser.senha = newUser.generateHash(senha);
                  newUser.nome  = req.body.nome;

	                // save the user
	                newUser.save(function(err) {
	                	if (err){
                    	throw err;
                    }
                    delete newUser.senha;
	                  return done(null, newUser);
	                });
	            }
	        });
    	});
    }));


	// =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'senha',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Usuario.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err){
                return done(err);
            }

            // if no user is found, return the message
            if (!user)
                return done(null, false, 'Usuário não encontrado.');

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, 'Senha inválida.');

            // all is well, return successful user
            return done(null, user);
        });

    }));

};
