const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('view enginge', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Archivos Static (CSS,IMG,JS)
app.use(express.static(path.join(__dirname,'public')));

//Inicializar servidor

app.listen(3000,() => {
    console.log("Se conecto al puerto");
});


app.get('/',(req,res)=> {
    res.render("paginainicio.html");
});



//POST

app.post('/addCategory',(req,res)=> {
    let nombre = "Steph";
 
    if(nombre == req.body.colorName){
     res.redirect('/');
    }
    console.log("No es igual");
    res.redirect('/Contactenos');
 });