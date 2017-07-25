var express = require('express');
var tarea = require('../../model/tarea.model');
var router = express.Router();

router.get('/tarea/', function(req, res, next) {
  tarea.selectAll(function(tareas) {
    if(typeof tareas !== 'undefined') {
      res.json(tareas);
    } else {
      res.json({"mensaje" : "No hay tareas"});
    }
  });
});

router.get('/tarea/:idTarea', function(req, res, next) {
  var idTarea = req.params.idTarea;
  tarea.select(idTarea, function(tareas) {
    if(typeof tareas !== 'undefined') {
      res.json(tareas[0]);
    } else {
      res.json({"mensaje" : "No hay tareas"});
    }
  });
});

router.post('/tarea', function(req, res, next) {
  var data = {
    idTarea : null,
    titulo : req.body.titulo,
    descripcion : req.body.descripcion,
    fechaInicial : req.body.fechaInicial,
    fechaFinal : req.body.fechaFinal,
    estado : req.body.estado
  }

  tarea.insert(data, function(resultado){
    if(resultado && resultado.insertId > 0) {
      res.json({
        estado: true,
        "mensaje":"No se ingreso la tarea"});
    } else {
      res.json({
        estado: false,
        "mensaje":"Se ingreso la tarea"});
    }
  });
});

router.put('/tarea/:idTarea', function(req, res, next){
  var data = {
    idTarea : req.params.idTarea,
    titulo : req.body.titulo,
    descripcion : req.body.descripcion,
    fechaInicial : req.body.fechaInicial,
    fechaFinal : req.body.fechaFinal,
    estado : req.body.estado
  }

  tarea.update(data, function(resultado){
    if(typeof resultado !== 'undefined') {
      res.json(resultado);
    } else {
      res.json({"mensaje":"No se pudo actualizar"});
    }

  });
});

router.delete('/tarea/:idTarea', function(req, res, next){
  var idTarea = req.params.idTarea;

  tarea.delete(idTarea, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado") {
      res.json(

        {estado: true,
          "mensaje":"No se elimino la tarea correctamente"});
    } else {
      res.json({
        estado: false,
        "mensaje":"Se elimino la tarea"});
    }
  });
});


module.exports = router;
