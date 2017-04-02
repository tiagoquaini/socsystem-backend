module.exports = function( app ){
var controller = {};
var Usuario = app.models.usuario;


	controller.getUsuario = function(req, res){
		var id = req.user._id;
		Usuario.findOne({ "_id" : id }).exec()
			.then(
				function(usuario){
					if(!usuario)
						throw new Error("Usuario não encontrado");
                    delete usuario.senha;
					res.json(usuario);
				},
				function(erro){
					res.status(404).json(erro);
				}
			);
	};

	controller.updateUsuario = function(req, res){
		Usuario.findOne({ 'email' :  req.user.email }, function(err, usuario){
				if (err)
					throw err;
				else if (usuario){
					usuario.nome = req.body.nome;
					usuario.email = req.body.email;

					usuario.save(function(erro){
						if (erro)
							res.status(500).json(erro);
						else
							res.status(200).json(usuario);
					})
				}
		});
	};


	controller.changePassword = function(req, res){
		Usuario.findOne({ 'email' :  req.user.email }, function(err, usuario){
				if (err)
					throw err;
				else if (!usuario) {
					res.status(500).send("Usuário não encontrado.");
				} else if (usuario){

					if (!usuario.validPassword(req.body.senhaAntiga))
                		res.status(403).send("Senha antiga inválida");
                	else {
                		usuario.senha = usuario.generateHash(req.body.senhaNova);

                		usuario.save(function(erro){
							if (erro)
								res.status(500).json(erro);
							else
								res.status(200).json(usuario);
						})
                	}
				}
		});
	};


	return controller;
}
