var express = require('express');
var contacto = require('../../model/contacto.model');
var services = require('../../services');
var router = express.Router();

router.get('/contacto/',services.verificar, function(req, res, next) {
  var idUsuario = req.usuario.idUsuario;
  contacto.select(idUsuario, function(contactos) {
    if(typeof contactos !== 'undefined') {
      res.json(contactos);
    } else {
      res.json({"mensaje" : "No hay contactos"});
    }
  });
});

router.get('/contacto/:id', services.verificar,function(req, res, next) {
  var idContacto = req.params.id;
  var idUsuario = req.usuario.idUsuario;
  contacto.select(idUsuario, function(contactos) {
    if(typeof contactos !== 'undefined') {
        res.json(contactos.find(c => c.idContacto == idContacto));
      } else {
        res.json({"mensaje" : "No hay contactos"});
    }
  });
});

router.post('/contacto', services.verificar, function(req, res, next) {
  var data = {
    idUsuario: req.usuario.idUsuario,
    nombreContacto : req.body.nombreContacto,
    apellido : req.body.apellido,
    telefono : req.body.telefono,
    direccion : req.body.direccion,
    correo : req.body.correo,
    idCategoria : req.body.idCategoria
  }

  contacto.insert(data, function(resultado){
    if(resultado && resultado.affectedRows > 0) {
      res.json({
        estado: true,
        mensaje: "Se agrego el contacto"
      });
    } else {
      estado : false,
      res.json({"mensaje":"No se ingreso el contacto"});
    }
  });
});

router.put('/contacto/:idContacto', function(req, res, next){
  var data = {
    nombreContacto : req.body.nombreContacto,
    apellido : req.body.apellido,
    telefono : req.body.telefono,
    correo : req.body.correo,
    direccion : req.body.direccion,
    idCategoria : req.body.idCategoria,
    idUsuario : req.body.idUsuario
  }
  contacto.update(data, function(resultado){
    if(typeof resultado !== 'undefined') {
      res.json(resultado);
    } else {
      res.json({"mensaje":"No se pudo actualizar"});
    }

  });
  });

  router.delete('/contacto/:idContacto', function(req, res, next){
    var idContacto = req.params.idContacto;

    contacto.delete(idContacto, function(resultado){
      if(resultado && resultado.mensaje === "Eliminado") {
        res.json(

          {estado: true,
            "mensaje":"No se elimino la contacto correctamente"});
      } else {
        res.json({
          estado: false,
          "mensaje":"Se elimino la contacto"});
      }
    });
  });

module.exports = router;
