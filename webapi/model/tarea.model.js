var database = require("../config/database.config");
var Tarea = {};

Tarea.select = function(idTarea, callback) {
  if(database) {
		database.query("SELECT * FROM Tarea WHERE idTarea=?", idTarea,
     function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados);
			}
		});
	}
}

Tarea.selectAll = function(callback) {
  if(database) {
		database.query('SELECT * FROM Tarea', function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados);
			}
		});
	}
}


Tarea.insert = function(data, callback) {
  if(database) {
    database.query('CALL SP_agregarTarea(?,?,?,?,?)',
    [ data.titulo, data.descripcion, data.fechaInicial, data.fechaFinal, data.estado],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"affectedRows": resultado.affectedRows});
      }
    });
  }
}

Tarea.update = function(data, callback){
	if(database) {
		database.query('CALL SP_updateTarea(?,?,?,?,?,?)',
		[ data.titulo, data.descripcion, data.fechaInicial, data.fechaFinal, data.estado, data.idTarea],
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(resultado[0]);
			}
		});
	}
}

Tarea.delete = function(idTarea, callback) {
	if(database) {
		database.query('DELETE FROM Tarea WHERE idTarea = ?', idTarea,
		function(error, resultado){
			if(error){
				throw error;
			} else {
				callback({"mensaje":"Eliminado"});
			}
		});
	}
}

module.exports = Tarea;
