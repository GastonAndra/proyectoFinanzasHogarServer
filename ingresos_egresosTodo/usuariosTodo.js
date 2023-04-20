const dbConection = require('../configuracion/config');

const bcryptjs = require ('bcryptjs');
/* const Connection = require('mysql2/typings/mysql/lib/Connection'); */

module.exports = {

retrieve(req, res) {
  db.query('SELECT * FROM usuarios WHERE idUsuarios = ?',
  [req.params.idUsuarios],
   (err, rows) => {
    if (!err)
      res.status(200).send(rows);
    else
      res.status(400).send(err)
    })
},


  list(req, res) {
    db.query('SELECT * FROM usuarios', (err, rows) => {
      if (!err)
        res.status(200).send(rows);
      else
        res.status(400).send(err)
      })
  },

  login (req,res) {
    const {usuario, password} = req.body
    const values = [usuario, password]
    dbConection.query("SELECT * FROM usuarios WHERE usuario =? AND password =?", values, (err, result) =>{
      if (err){
        res.status(500).send(err)
      } else{
        if(result.length > 0){
          res.status(200).send(result[0])
        }else{
          res.status(400).send('Usuario no existe')
        }
      }
    })
    dbConection.end()
  }

  /* login (req, res) {
  result = db.query('SELECT * FROM usuarios WHERE Nombre = ?',
  [req.params.Nombre, req.params.Password],
  async (err, result) => {
      password = req.body.password;
      let passwordHash = await bcryptjs.hash(password, 8);
      if (passwordHash == result.password)
        res.json ({
          message:'¡Autenticacion Exitosa!',
          passwordHash: passwordHash
        });
       else 
        res.json({
          message:'Ingrese correctamente los datos'
        });
        res.status(400).send(err)
        }
    )
}, */


}
