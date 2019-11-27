const express = require('express');
//Metodo Router que se encarga de devolver un objeto
const router = express.Router();
//Task tiene el esquema de los datos
const Task = require('../models/task');

//cuando pidan una peticion get

//res.send('Hello world'); =>enviar mensaje
router.get('/', async (req, res) => {
  //Pedir que muestre los datos agregados
  const tasks = await Task.find();
  console.log(tasks);
  res.json({
    data: tasks
  });
  //   renderizar vista
  //   res.render('index', {
  //     tasks
  //   });
});
router.get('/libros', async (req, res) => {
  //Pedir que muestre los datos agregados
  const tasks = await Task.find();
  console.log(tasks);

  res.json({
    data: tasks
  });

  //renderizar vista
  //   res.render('index', {
  //     tasks
  //   });
});
//Envio del form add"prueba",
router.post('/add', async (req, res) => {
  const task = new Task(req.body);
  await task.save();

  res.json({
    message: 'creado exitosamente',
    data: task
  });
  //   res.redirect('/');
});

//para actualizar datos por POST
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  await Task.update({ _id: id }, req.body);
  //   res.redirect('/');
  res.json({
    message: 'Actualizado correctamente'
  });
});
//para eliminar datos
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Task.remove({ _id: id });

  //   res.redirect('/');
  res.json({
    message: 'Eliminado correctamente'
  });
});

module.exports = router;
