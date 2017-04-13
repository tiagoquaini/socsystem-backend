module.exports = function( app ){
	var controller = {};

	controller.verifyAuthentication = function(req, res, next){
		if (req.isAuthenticated()) {
			if (req.user.deactivated) {
	      res.status('403').json('Conta desativada.');
	    } else {
			  return next();
	    }
		} else {
	    res.status('401').json('Não autorizado.');
	  }
	};

	controller.verifyAdmin = function(req, res, next){
		if (req.user && req.user.admin) {
			return next();
		} else {
	    res.status('401').json('Não autorizado.');
	  }
	};

	/*
	*
	* CRUD METHODS
	*
	*/

	controller.getAll = function(req, res, oModel){
		return oModel
		.find()
		.sort({ data : -1 })
		.exec()
		.then(
			function(aData){
				res.json(aData);
			},
			function(error){
				res.status(500).json(error);
			}
		);
	};

	controller.getAllByLoggedUser = function(req, res, oModel){
		return oModel
		.find({ "user" : req.user._id })
		.sort({ data : -1 })
		.exec()
		.then(
			function(aData){
				res.json(aData);
			},
			function(error){
				res.status(500).json(error);
			}
		);
	};

	controller.getByProperty = function(req, res, oModel, sProperty, sPropertyValue){
		var oQuery = {};
		oQuery[sProperty] = sPropertyValue;

		return oModel
		.findOne(oQuery)
		.exec()
		.then(
			function(oData){
				if (!oData) {
					res.status(404).send("Not found.");;
				} else {
					res.json(oData);
				}
			},
			function(error){
				res.status(404).json(error);
			}
		);
	};

	controller.getByPropertyAndPopulate = function(req, res, oModel, sProperty, sPropertyValue, sPopulateAttribute){
		var oQuery = {};
		oQuery[sProperty] = sPropertyValue;

		return oModel
		.findOne(oQuery)
		.populate(sPopulateAttribute)
		.exec()
		.then(
			function(oData){
				console.log(oData);
				if (!oData) {
					res.status(404).send("Not found.");
				} else {
					res.json(oData);
				}
			},
			function(error){
				res.status(404).json(error);
			}
		);
	};

	controller.deleteByProperty = function(req, res, oModel, sProperty, sPropertyValue){
		var oQuery = {};
		oQuery[sProperty] = sPropertyValue;

		return oModel
		.remove(oQuery)
		.exec()
		.then(
			function(){
				res.end();
			},
			function(error){
				res.status(500).json(error);
			}
		);
	};

	controller.create = function(req, res, oModel, mModelValues){
		return oModel
		.create(mModelValues)
		.then(
			function(oData){
				res.status(201).json(oData);
			},
			function(error){
				res.status(500).json(error);
			}
		);
	};

	controller.updateByProperty = function(req, res, oModel, mModelValues, sProperty, sPropertyValue){
		var oQuery = {};
		oQuery[sProperty] = sPropertyValue;

		return oModel
		.findOne(oQuery)
		.then(
			function(oEntity){

				for (var key in mModelValues) {
					oEntity[key] = mModelValues[key];
				}

				oEntity.save(function(err){
					if (err) {
						res.status(500).json(err);
					} else {
						res.status(200).json(oEntity);
					}
				});
			},
			function(error){
				res.status(500).json(error);
			}
		);
	};

	return controller;
}
