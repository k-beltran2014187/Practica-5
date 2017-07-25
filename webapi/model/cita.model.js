var database = require('../config/database.config');
var cita = {};

cita.selectAll = function(callback) {
  if(database) {
    database.query('SELECT * FROM Cita', function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}

cita.find = function(idCita, callback) {
  if(database) {
    database.query('SELECT * FROM Cita WHERE idCita=?', idCita, function(error, resultados){
      if(error) {
        throw error;
      } else {
        callback(resultados);
      }
    });
  }
}

cita.insert = function(data, callback) {
  if(database) {
    var consulta = "CALL SP_agregarCita(?,?,?)";
    database.query(consulta, [data.lugar, data.fecha, data.idContacto], function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });
  }
}

cita.update = function(data, callback){
  if(database){
    var sql = "Call "
    database.query(sql, [data.idCita, data.lugar, data.fecha, data.idContacto],
       function(error, resultado){
        if(error){
          throw error;
        }else{
          callback(null, data);
        }
      });
  }
}

cita.delete = function(idCita, callback){
  if(database){
    var consulta = "Call SP_deleteCita(?)";
    database.query(consulta, idCita,
      function(error, resultado){
        if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

module.exports = cita;
