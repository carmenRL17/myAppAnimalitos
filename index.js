//https://www.youtube.com/watch?v=27JCqmykNdc
//https://www.npmjs.com/package/mysql
//https://www.youtube.com/watch?v=f6bDzL8mqNI
// https://www.youtube.com/watch?v=zsnHIlsUPSU -----prac


const express = require('express')
const bodyParser = require('body-parser')
const { request, response } = require('express')
const Animalito = require("./paginas/animale")
const puetoDeExpress = 3000;
const app = express()


app.use(bodyParser.json())

const animales = new Animalito();

app.post('/AgregarAnimales', (request, response) => {
    if(Object.keys(request.body).length === 0){
        response.status(400);
        response.json({

            error: "favor de ingreasar los datos 😾"
        });
    }
    //const {nombre, nombreDuenio, edadMascota, tipo, ingreso} = request.body;
    animales.agregar(request.body,(error, animalito) =>{
        if(error){
            response.status(500);
            response.json({
                mensaje:"error 🤔"
            });
            return;
        }
        response.status(201);
        response.json({
        animales : animalito,
        mensaje :"Nuevo ingreso Exitoso 🐷"
        });
    });
    
});

app.get('/animalitos/todos', (request,response) =>{
    animales.leer((error, animalitos)=>{
        if(error){
            response.status(500);
            response.json({
                mensaje:"error 😵"
                
            });
            return;
        }
         response.json({   
            animales : animalitos,
            mensaje :"Tabla de resultados 🐮 🐷"
        });
    });
   
});

app.get('/animalitosId/:id', (request,response) =>{
       if(/^[0-9]+$/.test(request.params.id)){
        const animalId = Number(request.params.id)
        animales.buscarid(animalId, (error, animalito)=>{
            if(error){
                response.status(500);
                response.json({
                error: "codigo invalido 🙀"
                });
                return;
            }
            response.json({   
               animales : animalito,
               mensaje :"Resultados 🐷"
           });
       });
    }
});

app.put('/animalitos',(request, response) =>{
    if(Object.keys(request.body).length === 0){
        response.status(400);
        response.json({
            mensaje:"Ingresar los datos requeridos 🐼"
        });        
    }
    animales.actualizar(request.body, (error, animal) =>{
        if(error){
            response.status(500);
            response.json({
                mensaje: "error 😵"
            });
            console.log(error);           
            return;            
        }
        response.json({
            animalito : animal,
            mensaje: "Registro Actualizado 🐻"
        });
    });
     
});

app.delete('/animalitos/:id', (request, response) => {
    const idanimal = Number(request.params.id);
    animales.eliminar(idanimal, (error, animalito) => {
        if(error){
            response.status(500);
            response.json({
                mensaje:"error 🙊"
            });
            return;
        }
        response.json({
            animalEliminado: animalito,
            mensaje:"aniaml eliminado "
        });

    });
    /*response.status(400);
    response.json({
        error: `el registro con id : ${idanimal} no existe` 
    });*/

});

app.listen(puetoDeExpress, () =>{
    console.log(`Aplicacion escuchando en el ${puetoDeExpress}`);
});
