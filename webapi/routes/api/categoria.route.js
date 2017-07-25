var express = require('express');
var categoria = require('../../model/categoria.model');
var router = express.Router();

router.get('/categoria/', function(req, res, next) {
  categoria.selectAll(function(categorias) {
    if(typeof categorias !== 'undefined') {
      res.json(categorias);
    } else {
      res.json({"mensaje" : "No hay categorias"});
    }
  });
});

router.get('/categoria/:idCategoria', function(req, res, next) {
  var idCategoria = req.params.idCategoria;
  categoria.select(idCategoria, function(categorias) {
    if(typeof categorias !== 'undefined') {
      res.json(categorias[0]);
    } else {
      res.json({"mensaje" : "No hay categorias"});
    }
  });
});

router.post('/categoria', function(req, res, next) {
  var data = {
    idCategoria : null,
    nombreCategoria : req.body.nombreCategoria
  }

  categoria.insert(data, function(resultado){
    if(resultado && resultado.insertId > 0) {
      res.json({
        estado: true,
        "mensaje":"Se ingreso la categoria"});
    } else {
      res.json({
        estado: false,
        "mensaje":"No se ingreso la categoria"});
    }
  });
});


router.put('/categoria/:idCategoria', function(req, res, next){
  var data = {
    idCategoria : req.params.idCategoria,
    nombreCategoria : req.body.nombreCategoria
  }

  categoria.update(data, function(resultado){
    if(typeof resultado !== 'undefined') {
      res.json(resultado);
    } else {
      res.json({"mensaje":"No se pudo actualizar"});
    }

  });
});

router.delete('/categoria/:idCategoria', function(req, res, next){
  var idCategoria = req.params.idCategoria;

  categoria.delete(idCategoria, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado") {
      res.json(

        {estado: true,
          "mensaje":"No se elimino la categoria correctamente"});
    } else {
      res.json({
        estado: false,
        "mensaje":"Se elimino la categoria"});
    }
  });
});


module.exports = router;
