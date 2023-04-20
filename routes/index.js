const ingresosTodo = require('../ingresos_egresosTodo/ingresosTodo');
const egresosTodo = require('../ingresos_egresosTodo/egresosTodo');
const usuariosTodo = require('../ingresos_egresosTodo/usuariosTodo');

module.exports = (app) => {

/*
  Esta sección hace lo siguiente:
  * En primer lugar, la parte 'app.all' le dice a Express Router que capture cada HTTP VERB que se solicita al servidor (GET, POST, PUT, DELETE, etc.).
  *El primer parámetro hace que catee todas las solicitudes, independientemente de cuál sea la URI de la solicitud (así, está ignorando si la solicitud se realizó a '/' o '/api' o '/whatever(lo que sea)', los detectará a todos).
  *La segunda parte es una función sin nombre que recibe 3 parámetros. El primero ('req') tiene todos los datos relacionados con la solicitud (request header(encabezado de solicitud), body(cuerpo), etc.).
  El segundo parámetro se usa para definir los datos que enviaremos como respuesta (response herader(encabezado de respuesta), cuerpo(body), etc.).
  El tercer parámetro habilita la capacidad de manejar la misma solicitud mediante una segunda callback. Sin este parámetro, no podemos realizar la llamada 'next()'.
  El siguiente parámetro es necesario aquí por una razón principal e importante, si no lo usáramos, todas las solicitudes serían capturadas solo por esta instrucción del enrutador y ninguno otro
  */
  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  
/*
  El enrutamiento express:
  Tomemos, por ejemplo, la siguiente instrucción del enrutador:
    app.get('/api/todos/:todoId', todosController.retrieve);
  Los parámetros de ruta son segmentos de URL con nombre  (i.e.: ':todoId') que se utilizan para capturar los valores especificados en su posición en la URL. 
  Los valores capturados se rellenan en el req.params object, 
  con el nombre del parámetro de ruta especificado en la ruta como sus respectivas claves. (i.e.: 'req.params.todoId').
  Otros ejemplos  (from official docs): 
    Ruta de acceso:/users/:userId/books/:bookId
    Request URL: http://localhost:3000/users/34/books/8989
     req.params: { "userId": "34", "bookId": "8989" }
---------------------------------------------------------
    Route path: /flights/:from-:to    ---> TENGA EN CUENTA QUE: Express Router interpreta los guiones ('-') y los puntos ('.') como literales
    Request URL(URL de solicitud): http://localhost:3000/flights/LAX-SFO
        req.params: { "from": "LAX", "to": "SFO" }
    Entonces, si quisiéramos usar ese URI de instrucción de enrutador original,
    deberíamos escribirlo después de todos los demás URI de instrucciones del enrutador que comienzan con '/api/todos/' y que usan el VERBO HTTP 'GET'. Tener en cuenta
    que las instrucciones del router son posicionales, analiza la primera instrucción y luego la segunda instrucción y así sucesivamente hasta llegar a un
    URI de instrucción del enrutador que coincide con el de la solicitud.
*/
  app.post('/ingresos/create', ingresosTodo.create);
  app.get('/ingresos/list', ingresosTodo.list);
  app.get('/ingresos/:idIngresos', ingresosTodo.retrieve);
  app.put('/ingresos/:idIngresos', ingresosTodo.update);
  app.delete('/ingresos/:idIngresos', ingresosTodo.destroy);

  app.post('/egresos/create', egresosTodo.create);
  app.get('/egresos/list', egresosTodo.list);
  app.get('/egresos/:idEgresos', egresosTodo.retrieve);
  app.put('/egresos/:idEgresos', egresosTodo.update);
  app.delete('/egresos/:idEgresos', egresosTodo.destroy);

  app.post('/usuarios/login', usuariosTodo.login);
  app.get('/usuarios/list', usuariosTodo.list);
  app.get('/usuarios/:idUsuarios', usuariosTodo.retrieve);

};