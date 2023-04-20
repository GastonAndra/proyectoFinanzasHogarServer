const db = require('../configuracion/config');

module.exports = {

  create(req, res) {
    console.log(req) 
    console.log(req.body)
    result = db.query(`INSERT INTO ingresos (Nombre, Frecuencia, Monto, Fecha, Aumento, Estado)
    VALUES
    (?, ?, ?, ?, ?, ?)`,
    [req.body.nombre, req.body.frecuencia, req.body.monto, req.body.fecha, req.body.aumento, req.body.estado],
    (err, result) => {
      if (!err)
        res.status(201).send(result);
      else
        res.status(400).send(err)
      })
  },


  list(req, res) {
    db.query('SELECT * FROM ingresos', (err, rows) => {
      if (!err){
      console.log(rows)
        res.status(200).send(rows);
      }else{
        console.log(err)
        res.status(400).send(err)
      }
    })
  },

  update(req, res) {
    result = db.query(`UPDATE ingresos 
    SET Nombre = ?, Frecuencia = ?, Monto = ?, Fecha = ?, Aumento = ?, Estado = ?
    WHERE idIngresos = ?`, 
    [req.body.Nombre, req.body.Frecuencia, req.body.Monto, req.body.Fecha,req.body.Aumento, req.body.Estado, req.params.idIngresos],
    (err, result) => {
      if (!err)
        res.status(200).send(result);
      else
        res.status(400).send(err)
      })
  },

 destroy(req, res) {
    db.query('DELETE FROM ingresos WHERE idIngresos = ?',
    [req.params.idIngresos],
     (err,result) => {
      if (!err)
        res.status(200).send(result);
      else
        res.status(400).send(err)
      })
},

  retrieve(req, res) {
    db.query('SELECT * FROM ingresos WHERE idIngresos = ?',
    [req.params.idIngresos],
     (err, rows) => {
      if (!err)
        res.status(200).send(rows);
      else
        res.status(400).send(err)
      })
  },


};