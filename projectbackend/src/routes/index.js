const express = require('express');
//Metodo Router que se encarga de devolver un objeto
const router = express.Router();
//Task tiene el esquema de los datos
const Task = require('../models/task');

//cuando pidan una peticion get

//res.send('Hello world'); =>enviar mensaje
router.get('/', async(req,res) =>{
    //Pedir que muestre los datos agregados
    const tasks = await Task.find();
    console.log(tasks);
    
    //renderizar vista
    res.render('index',{
        tasks
    });
});
//Envio del form add
router.post('/add', async (req,res) =>{
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
});
//para actualizar datos
router.get('/edit/:id', async (req,res) =>{
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit',{
        task
    });
});
//para actualizar datos por POST
router.post('/edit/:id', async (req,res) =>{
    const { id } = req.params;
    await Task.update({_id:id}, req.body);
    res.redirect('/');
});
//para eliminar datos
router.get('/delete/:id', async(req,res) =>{
    const { id } = req.params;
    await Task.remove({_id : id});
    res.redirect('/');
});

module.exports = router;
