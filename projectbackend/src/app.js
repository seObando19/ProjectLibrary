const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); //procesar datos antes de que lleguen
const mongoose = require('mongoose');

const app = express();

// convert res to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//conectando la BD
mongoose
  .connect('mongodb://localhost/Library')
  .then(db => console.log('Db connected'))
  .catch(err => console.log(err));
//importar rutas
const indexRoutes = require('./routes/index');
//configuraciones
app.set('port', process.env.PORT || 3000);
//muestra donde esta lacarpeta views
app.set('views', path.join(__dirname, 'views'));
//menciona que vamos a usar un motor de pantillas
app.set('view engine', 'ejs');
//middlewares =>funcion que se ejecuta antes de llegar a las rutas
app.use(morgan('dev'));
//urlencoded() => entender los datos que se le envian desde un form html
app.use(express.urlencoded({ extended: false }));
//routes
app.use('/', indexRoutes);
//iniciando sevidor
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
