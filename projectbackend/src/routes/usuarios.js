const express = require('express');
//Metodo Router que se encarga de devolver un objeto
const router = express.Router();
//usuarios tiene el esquema de los datos
const usuario = require('../models/usuario');

router.get('/usuarios', (req,res) =>{
    res.send('Hello world');
});
