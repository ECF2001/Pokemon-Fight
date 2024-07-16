const express = require('express');

const app = express();

//Inicializar servidor

app.listen(3000,() => {
    console.log("Se conecto al puerto");
});


app.get('/',(req,res)=> {
    res.send("Hola Mundo");
});