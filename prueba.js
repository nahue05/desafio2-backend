const Contenedor = require("./index.js")

const products = new Contenedor ('test.txt')

const test = async () => {
    let save = await products.save({
        title: 'mouse',
        price: 150,
        thumbnail: 'hello'
    })
    let getAll = await products.getAll();
    let getById = await products.getById();
    let deleteById = await products.deleteById();
    let deleteAll = await products.deleteAll();
    console.log(save);
    console.log(getAll);
    console.log(getById);
    console.log(deleteById);
    console.log(deleteAll);



};

test();