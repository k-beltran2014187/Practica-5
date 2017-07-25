CREATE DATABASE AgendaEjemplo;
USE AgendaEjemplo;

/*TABLA CATEGORIA*/
CREATE TABLE Categoria(
	idCategoria INT NOT NULL AUTO_INCREMENT,
	nombreCategoria VARCHAR (30) NOT NULL,
	PRIMARY KEY (idCategoria)
);

/*TABLA CONTACTO*/
CREATE TABLE Contacto(
	idContacto INT NOT NULL AUTO_INCREMENT,
	nombreContacto VARCHAR (30) NOT NULL,
	apellido VARCHAR (30) NOT NULL,
	direccion VARCHAR (30) NOT NULL,
	telefono VARCHAR (30) NOT NULL,	
	correo VARCHAR (30) NOT NULL,
	idCategoria INT NOT NULL,
	PRIMARY KEY (idContacto),
	FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);

/*TABLA USUARIO*/
CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT,
	nick VARCHAR (30) NOT NULL,
	contrasena VARCHAR (30) NOT NULL,
    primary key (idUsuario)
);

/*TABLA USUARIODETALLE*/
CREATE TABLE UsuarioDetalle(
	idUsuarioDetalle INT NOT NULL AUTO_INCREMENT,
	idUsuario INT NOT NULL,
	idContacto INT NOT NULL,
	PRIMARY KEY (idUsuarioDetalle),
	FOREIGN KEY (idUsuario) REFERENCES Usuario (idUsuario),
	FOREIGN KEY (idContacto) REFERENCES Contacto (idContacto)
);

/*TABLA HISTORIAL*/
CREATE TABLE Historial(
	idHistorial  INT NOT NULL AUTO_INCREMENT ,
    descripcion VARCHAR(100) NOT NULL,
    fecha datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    idUsuario INT NOT NULL,
    PRIMARY KEY (idHistorial),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
); 

/*TABLA TAREA*/
CREATE TABLE Tarea(
	idTarea INT NOT NULL AUTO_INCREMENT,
	titulo VARCHAR (50) NOT NULL,
	descripcion VARCHAR (100) NOT NULL,
	fechaInicial datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	fechaFinal datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	estado VARCHAR (20) NOT NULL,
	PRIMARY KEY(idTarea)
);

/*VISTA LISTA CONTACTO*/
CREATE VIEW  vistaContacto AS
SELECT contacto.idContacto, nombreContacto, apellido, direccion, telefono, correo, nombreCategoria 
FROM Contacto 
INNER JOIN categoria ON contacto.idCategoria = categoria.idCategoria;

/* TRIGGER*/
DELIMITER @@
CREATE TRIGGER registroContacto AFTER INSERT ON UsuarioDetalle
  FOR EACH ROW
  BEGIN
    DECLARE _idUsuario integer;
    SET _idUsuario = (SELECT idUsuario from UsuarioDetalle ORDER BY idUsuarioDetalle DESC LIMIT 1);
    IF (_idUsuario <> 0) THEN
       INSERT INTO Historial(descripcion, idUsuario) VALUES ('Ha agregado un contacto', _idUsuario);
    END IF;
  END;
@@

/*SELECTS DE EJECUTAR/PRUEBA*/
SELECT* FROM Contacto;
SELECT * FROM Usuario;
SELECT * FROM Categoria;
SELECT * FROM vistaContacto;

/*REGISTRAR*/
/*CREAR USUARIO*/
DELIMITER //
CREATE PROCEDURE SP_addUser(IN user_name VARCHAR (30), IN passwordUser VARCHAR (30))
	BEGIN
	INSERT INTO Usuario(nick, contrasena) VALUES (user_name, passwordUser);
	END 
    
/*CALL SP_addUser('pablo', '0000');
SELECT * FROM Usuario;*/

/*CREAR CATEGORIA*/
DELIMITER //
CREATE PROCEDURE SP_addCategoria1(IN c_nombre VARCHAR (30))
	BEGIN
    INSERT INTO Categoria(nombreCategoria) VALUES (c_nombre);
    END
 
 /*CALL SP_addCategoria1('Amigos');
 SELECT * FROM Categoria;*/
 
 /*CREAR CONTACTO*/
 DELIMITER //
CREATE PROCEDURE SP_agregarContacto(IN ct_nombre VARCHAR (30), IN ct_apellido VARCHAR (30), IN ct_direccion VARCHAR(30), IN ct_telefono VARCHAR (30), IN ct_correo VARCHAR (30), IN ct_idCategoria INT)
	BEGIN
	INSERT INTO Contacto(nombreContacto, apellido, direccion, telefono, correo, idCategoria) VALUES (ct_nombre, ct_apellido, ct_direccion, ct_telefono, ct_correo, ct_idCategoria);
	END 
    
 CALL SP_agregarContacto('Jorge', 'Peraza', 'Zona 21', '1231564', 'jorgec@gmail.com', 1);
 SELECT * FROM Contacto;
 
 /*CREAR CONTACTO SEGUNDA OPCION*/
 DELIMITER $$
CREATE PROCEDURE SP_addContacto(IN _nombre VARCHAR(30), IN _apellido VARCHAR(30), IN _direccion VARCHAR(30), IN _telefono VARCHAR(12), IN _correo VARCHAR(40), IN _idCategoria INT, IN _idUsuario INT) BEGIN DECLARE _idNuevoContacto INT DEFAULT 0;
INSERT INTO Contacto(nombreContacto, apellido, direccion, telefono, correo, idCategoria) VALUES (_nombre, _apellido, _direccion, _telefono, _correo, _idCategoria); SET _idNuevoContacto = (
SELECT MAX(idContacto)
FROM Contacto);
INSERT INTO UsuarioDetalle(idUsuario, idContacto) VALUES (_idNuevoContacto, _idUsuario); END
$$
 
/*CREAR DETALLEUSUARIO*/ 
 DELIMITER //
CREATE PROCEDURE SP_addDetalleUsuario(IN dt_idUsuario INT, IN dt_idContacto INT)
	BEGIN
	INSERT INTO UsuarioDetalle(idUsuario, idContacto) VALUES (dt_idUsuario, dt_idContacto);
	END
    
/* CALL SP_addDetalleUsuario(1, 1);
 SELECT * FROM UsuarioDetalle;*/
 
 /*CREAR TAREAS*/
 DELIMITER //
CREATE PROCEDURE SP_agregarTarea(IN t_titulo VARCHAR (50), IN t_descripcion VARCHAR (100), IN t_fechaInicial datetime, IN t_fechaFinal datetime, IN t_estado VARCHAR (30))
	BEGIN 
    INSERT INTO Tarea(titulo, descripcion, fechaInicial, fechaFinal, estado) VALUES (t_titulo, t_descripcion, t_fechaInicial, t_fechaFinal, t_estado);
	END
    
/*CALL SP_agregarTarea('Prueba', 'Esto es una prueba', '2014-09-08 17:51:04.777', '2014-09-08 18:00:00:00', 'Media');
SELECT * FROM Tarea;*/

/*MODIFICAR*/
DELIMITER //
CREATE PROCEDURE SP_updateUsuario(IN u_idUsuario INT, IN user_name VARCHAR (30), IN passwordUser VARCHAR (30))
	BEGIN
    UPDATE Usuario
    SET
		nick = user_name, 
        password = passwordUser
    WHERE idUsuario =  u_idUsuario;
    END
		
/*CALL SP_updateUsuario('1', 'admin', 'admin')    
SELECT * FROM Usuario; */

DELIMITER //
CREATE PROCEDURE SP_updateContacto(IN ct_idContacto INT, IN ct_nombre VARCHAR (30), IN ct_apellido VARCHAR (30), IN ct_direccion VARCHAR(30), IN ct_telefono VARCHAR (30), IN ct_correo VARCHAR (30), IN ct_idCategoria INT)
	BEGIN
    
    UPDATE Contacto
    SET
		nombreContacto = ct_nombre, 
        apellido = ct_apellido,
        direccion = ct_direccion,
        telefono = ct_telefono,
        correo = ct_correo,
        idCategoria = ct_idCategoria
    WHERE idContacto =  ct_idContacto;
    END
 
 /*CALL SP_updateContacto('4', 'Pedro', 'jk', 'zona 10', '123333', 'js@gmail.com', '1')
 SELECT * FROM Contacto;*/
 



DELIMITER $$
CREATE PROCEDURE SP_updateCategoria(IN _idCategoria INT, IN _nombreCategoria VARCHAR(30)) BEGIN
UPDATE Categoria SET nombreCategoria = _nombreCategoria WHERE idCategoria = _idCategoria; END
$$

CALL SP_updateCategoria('33', 'Casa');
select * from Categoria;

/*ELIMINAR*/
 DELIMITER //
 CREATE PROCEDURE SP_deleteUsuario(IN u_idUsuario INT)
	BEGIN 
		
    DELETE FROM Usuario
    WHERE  idUsuario = u_idUsuario;
END 

/*CAll SP_deleteUsuario(2);
SELECT * FROM Usuario; */

 DELIMITER //
 CREATE PROCEDURE SP_deleteContacto(IN ct_idContacto INT)
	BEGIN 
		
    DELETE FROM Contacto
    WHERE  idContacto = ct_idContacto;
END

DELIMITER //
CREATE PROCEDURE SP_deleteTarea(IN t_idTarea INT)
	BEGIN
    
    DELETE FROM Tarea
    WHERE idTarea = t_idTarea;
END    

/*CALL SP_deleteTarea(1);
Select * from Tarea;*/

 DELIMITER //
 CREATE PROCEDURE SP_deleteDetalleUsuario(IN dt_idDetalleUsuario INT)
	BEGIN 
		
    DELETE FROM UsuarioDetalle
    WHERE  idUsuarioDetalle = dt_idDetalleUsuario;
END

 DELIMITER //
 CREATE PROCEDURE SP_deleteCategoria(IN c_idCategoria INT)
	BEGIN 
		
    DELETE FROM Categoria
    WHERE  idCategoria= c_idCategoria;
END

