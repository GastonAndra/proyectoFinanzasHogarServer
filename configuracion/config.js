const mysql = require ("mysql2");
const fs = require ('fs');

//conexion con mySQL
var dbConection = mysql.createConnection ({
    //se define la red privada(direccion IP) que por default es siempre la misma
    host: "finanzastp.mysql.database.azure.com",
    //Nombre definido en la BD
    user: "veroparedes",
    //contraseña de la BD
    password: "Electromecanica00",
    //nombre de la BD o squema a trabajar
    database: "finanzasdelhogar",
    multipleStatements: true,
    ssl:{
      ca:fs.readFileSync(__dirname + "/DigiCertGlobalRootCA.crt.pem")
     }
  })
  
  dbConection.connect((err)=>{
    //definimos una funcion de callbak en caso de error
    if (!err){
      console.log("conectado con exito a la bd");
    } else{
      console.log(JSON.stringify(err,undefined,2));
    }
  })

      module.exports = dbConection;