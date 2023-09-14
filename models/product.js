const fs = require('fs')
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([])
        };
        cb(JSON.parse(fileContent))
    });
};

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    };


    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    };

    static fetchAll(cb) {
        getProductsFromFile(cb)
    };

    static findById(id, cb) {
        getProductsFromFile((products) => {
            const existingProduct = products.find(prod => prod.id === id);
            if (existingProduct) {
                cb(existingProduct)
            } else {
                cb([])
            }
        })
    };

    static updateProduct(newObject) {
        getProductsFromFile(products => {
            const existingIndex = products.findIndex(prod => prod.id === newObject.id);
            products[existingIndex] = newObject;
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log('donee', err);
            });
        });
    };

}