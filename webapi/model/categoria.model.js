var database = require("../config/database.config");
var Categoria = {};

Categoria.select = function(idCategoria, callback) {
  if(database) {
		database.query("SELECT * FROM Categoria WHERE idCategoria=?", idCategoria,
     function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados);
			}
		});
	}
}

Categoria.selectAll = function(callback) {
  if(database) {
		database.query('SELECT * FROM Categoria', function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados);
			}
		});
	}
}


Categoria.insert = function(data, callback) {
  if(database) {
    database.query('CALL SP_addCategoria1(?)',
    [data.nombreCategoria],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"affectedRows": resultado.affectedRows});
      }
    });
  }
}

Categoria.update = function(data, callback){
	if(database) {
		database.query('CALL SP_updateCategoria(?,?)',
		[data.idCategoria ,data.nombreCategoria],
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(resultado[0]);
			}
		});
	}
}

Categoria.delete = function(idCategoria, callback) {
	if(database) {
		database.query('CALL SP_deleteCategoria(?)', idCategoria,
		function(error, resultado){
			if(error){
				throw error;
			} else {
				callback({"mensaje":"Eliminado"});
			}
		});
	}
}

module.exports = Categoria;
