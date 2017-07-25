var express = require('express');
var cita = require('../../model/cita.model');
var router = express.Router();

router.get('/cita/', function(req, res, next) {
 // var idUsuario = req.usuario.idUsuario;
  cita.selectAll(function(citas) {
    if(typeof citas !== 'undefined') {
      res.json(citas);
    } else {
      res.json({"mensaje" : "No hay citas"});
    }
  });
});

router.get('/cita/:idCita', function(req, res, next) {
  var idCita = req.params.idCita;
  cita.find(idCita, function(citas) {
    if(typeof citas !== 'undefined') {
      res.json(citas.find(c => c.idCita == idCita));
    } else {
      res.json({"mensaje" : "No hay citas"});
    }
  });
});

router.post('/cita', function(req, res, next) {
  var data = {
    lugar : req.body.lugar,
	fecha : req.body.fecha,
    idContacto : req.body.idContacto
  };

  cita.insert(data, function(resultado){
    if(resultado && resultado.affectedRows > 0) {
      res.json({
        estado: true,
        mensaje: "Se agrego la cita"
      });
    } else {
      res.json({"mensaje":"No se ingreso el cita"});
    }
  });
});

router.put('/cita/:idCita', function(req, res, next){
  var data = {
    idCita : req.params.idCita,
    lugar : req.body.lugar,
    fecha : req.body.fecha,
    idContacto : req.body.idContacto
  }

  cita.update(data, function(resultado){
    if(typeof resultado !== 'undefined') {
      res.json(resultado);
    } else {
      res.json({"mensaje":"No se pudo actualizar"});
    }
  });
});

router.delete('/cita/:idCita', function(req, res, next){
  var idCita = req.params.idCita;

  cita.delete(idCita, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado") {
      res.json({"mensaje":"Se elimino el cita correctamente"});
    } else {
      res.json({"mensaje":"Se elimino el cita"});
    }
  });
});


module.exports = router;
