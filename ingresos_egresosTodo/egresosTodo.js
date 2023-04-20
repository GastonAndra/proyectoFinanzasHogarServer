const db = require('../configuracion/config');

module.exports = {
//
  create(req, res) {
    console.log(req)
    console.log(req.body)
    result = db.query(`INSERT INTO egresos (Nombre, Frecuencia, Monto, Fecha, Aumento, Estado)
    VALUES
    (?, ?, ?, ?, ?, ?)`, 
    [req.body.nombre, req.body.frecuencia, req.body.monto, req.body.fecha,req.body.aumento,req.body.estado],
    (err, result) => {
      if (!err)
        res.status(201).send(result);
      else
        res.status(400).send(err)
      })
  },


  list(req, res) {
    db.query('SELECT * FROM egresos', (err, rows) => {
      if (!err)
        res.status(200).send(rows);
      else
        res.status(400).send(err)
      })
  },

  update(req, res) {
    result = db.query(`UPDATE egresos 
    SET Nombre = ?, Frecuencia = ?, Monto = ?, Fecha = ?, Aumento =?, Estado = ?
    WHERE idEgresos = ?`, 
    [req.body.Nombre, req.body.Frecuencia, req.body.Monto, req.body.Fecha,req.body.Aumento, req.body.Estado, req.params.idEgresos],
    (err, result) => {
      if (!err)
        res.status(200).send(result);
      else
        res.status(400).send(err)
      })
  },

 destroy(req, res) {
    db.query('DELETE FROM egresos WHERE idEgresos = ?',
    [req.params.idEgresos],
     (err, result) => {
      if (!err)
        res.status(200).send(result);
      else
        res.status(400).send(err)
      })
  },

  retrieve(req, res) {
    db.query('SELECT * FROM egresos WHERE idEgresos = ?',
    [req.params.idEgresos],
     (err, rows) => {
      if (!err)
        res.status(200).send(rows);
      else
        res.status(400).send(err)
      })
  },


};