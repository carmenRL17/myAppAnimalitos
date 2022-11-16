const mysql = require('mysql')
class Animalitos{
    constructor(){
        this.config={
            host: "localhost",
            user:"root",
            password:"docker.2022",
            database:"clinica",
            port: 23306
        };
    }
    agregar(datos, notifAnimalito){
        var con = mysql.createConnection(this.config);
        con.connect();

        con.query(`INSERT INTO animalitos(nombre_animal, nombre_duenio, edad_animal, tipo_mascota, diagnostico) 
            VALUES('${datos.nombre}','${datos.nombreDuenio}', '${datos.edadMascota}','${datos.tipo}','${datos.ingreso}')`, function(error, res){
            if(error){
                notifAnimalito(error, null);
                return;
            }
            notifAnimalito(null, datos);
        });
    }          

    leer(notifAnimalitos){
        var con = mysql.createConnection(this.config);
        con.connect();
        let arrayAnimalitos = [];
        const r = con.query(`SELECT * FROM animalitos`);
        console.log(r);
        con.query(`SELECT * FROM animalitos`,(error, resultado) =>{
            if(error) {
                notifAnimalitos(error, null);
                return;
            }

            if(resultado.length > 0){
                arrayAnimalitos =resultado.map((elemento) =>{
                    return {
                        id:elemento.id,
                        nombre:elemento.nombre_animal,
                        nombreDuenio:elemento.nombre_duenio,
                        edadmascota:elemento.edad_animal,
                        tipo:elemento.tipo_mascota,
                        ingreso:elemento.diagnostico
                    }
                })
                
            }
            notifAnimalitos(null, arrayAnimalitos);
        });
    }
    buscarid(id,animalito){
        var con = mysql.createConnection(this.config);
        con.connect();
        let animalitoResul = null;
        con.query(`SELECT * FROM animalitos WHERE id = ${id}`,(error, resultados) =>{
            if(error) {
                //throw error;

                animalito(error, null)
                return;
            }
            if(resultados.length >0){
               let elemento=resultados[0]; 
                animalitoResul={
                    id:elemento.id,
                    nombre:elemento.nombre_animal,
                    nombreDuenio:elemento.nombre_duenio,
                    edadmascota:elemento.edad_animal,
                    tipo:elemento.tipo_mascota,
                    ingreso:elemento.diagnostico
                }
                animalito(null, animalitoResul); 
            }else{
                //no hay error, animalito no existe en BD.
                animalito(null, null);
            }                                                
        });
               
    }

    actualizar(datos,notifAnimal){
        var con = mysql.createConnection(this.config);
        con.connect();
        console.log(datos);
        con.query(`UPDATE animalitos SET
            nombre_animal='${datos.nombre}', 
            nombre_duenio='${datos.nombreDuenio}',
            edad_animal=${datos.edadMascota}, 
            tipo_mascota='${datos.tipo}', 
            diagnostico='${datos.ingreso}' WHERE id = ${datos.id}`,(error, resultado) =>{
            if(error) {
              notifAnimal(error, null);  
            }
            notifAnimal(null, datos);        
        });            
    }

    eliminar(id, notifAnimalito){

        this.buscarid(id, (error, animalito) => {
            if(error) {
                notifAnimalito(error, null);
                return;
            }
            if(animalito=== null){
                notifAnimalito("animalito no existe", null)
                return;
            }
            console.log(animalito);
            var con =mysql.createConnection(this.config);
            con.connect();
            con.query(`DELETE FROM animalitos WHERE id=${id}`,(error, resultado) =>{
                console.log(resultado);
                if(error) {
                    console.log(error);
                    notifAnimalito(error, null);
                }
                notifAnimalito(null, animalito);
            });
        });       
    }
}
// para acceder a nuestra clase desde otra seccion del programa.
module.exports =Animalitos;