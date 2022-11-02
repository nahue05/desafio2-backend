const fs = require('fs');

class Contenedor{
    nextId;
    arrayObj = new Array();
    constructor(archivoNombre){
        this.archivoNombre = archivoNombre
        if(fs.existsSync(archivoNombre)){
            this.arrayObj = JSON.parse(fs.readFileSync(this.archivoNombre, "utf-8"));
            this.nextId = this.#getNextId();
            console.log("existe");
        } else{
            this.nextId = 0;
            fs.writeFileSync(this.archivoNombre, JSON.stringify(this.arrayObj));
            console.log("No existe");
        }
    }

    async save(object){
        try{
            if (!this.#isInFile(object)) {
                object["id"] = this.nextId;
                this.nextId++;
                this.arrayObj.push(object);
                await fs.promises.writeFile(this.archivoNombre, JSON.stringify(this.arrayObj));
                console.log("se guardo" + object.id);
                return Promise.resolve(object.id);
            }else{
                console.log("El objeto ya existe");
            }
        } catch (err){
            console.log(err);
        }
    }

    getById(id){
        let obj = null;
        this.arrayObj.map((element) =>{
            if(element.id == id){
                obj= element
            }
        })
        return obj
    }

    #isInFile(obj){
        let response = false;
        this.arrayObj.forEach(element =>{
            if(element.title == obj.title && element.price == obj.price && element.thumbnail == obj.thumbnail){
                response = true;
            }
        })
        return response;
    }
    #getNextId(){
        if(thiss.arrayObj.length>0){
            let maxId = this.arrayObj.reduce((acc,current)=>{
                return Math.max(acc,current.id)
            },0)
            return maxId + 1;
        } else{
            return 0
        }
    }

    async getAll(){
        try{
            const data = await fs.promises.readFile(this.archivoNombre,"utf-8");
            this.arrayObj = JSON.parse(data);
            return this.arrayObj;
        }catch (err){
            console.log(err);
        }
    } 

    async deleteById(id){
        let flag = false
        for (let i=0; i<this.arrayObj.length; i++){
            if(this.arrayObj[i].id === id){
                flag = truethis.arrayObj.splice(i, 1)
                i--
            }
        }
        if (flag){
            try{
                await fs.promises.writeFile(this.archivoNombre,JSON.stringify(this.arrayObj))
                console.log("se ah borrado");
            }
            catch(err){
                console.log(err);
            }
        }else{
            console.log("No se logro borrar el objeto porque no existe");
        }
    }
    async deleteAll(){
        this.arrayObj = []
        try{
            await fs.promises.writeFile(this.archivoNombre,JSON.stringify(this.arrayObj))
            console.log("se borro todo");
        }catch{
            console.log(err);
        }
    }
}

let objeto1 = {title:'mouse', price: '150Usd',thumbnail:"aaa"}
let objeto2 = {title:'teclado', price: '100Usd',thumbnail:"aaa"}
let objeto3 = {title:'monitor', price: '300Usd',thumbnail:"aaa"}


const productos = new Contenedor("./test.txt")


function prueba(){
    productos.getAll()
    .then(() => productos.save(objeto1))
    .then(() => productos.save(objeto2))
    .then(() => productos.save(objeto3))
    .then(array => {
        console.log(array)
        console.log(productos.getById(5));
    })
}

prueba()
