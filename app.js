// Express es lo que nos permite recibir las solicitudes y manejar las respuestas. Nos traemos el modulo de express, luego creamos una variable que contenga ese modulo.
const express = require('express');
//hacemos uso de express a través de la variable app
const app = express();

//morgan es un registrador de solicitudes http (su enfoque es registrar solo cosas relacionadas con http)
const logger = require('morgan');

//body-parser es un middleware que verifica y valida las solicitudes de cuerpo entrantes (para que coincidan con lo que esperamos)
const bodyParser = require('body-parser');

const dbConection = require('./configuracion/config')

//Registro de solicitudes por consola.
app.use(logger('dev'));

//Acepta body codificado en json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT ? process.env.PORT : '4000'

app.listen(port);

//Require our routes into the application.
  require('./routes/index')(app);

  app.get('/', (req, res) => res.status(200).send({
    message: '⬆️ Server is up ⬆️ ',
  }));
  app.get('/status', (req, res) => res.status(200).send({
    message: '⬆️ Server is up ⬆️ ',
  }));

  module.exports = app;

  