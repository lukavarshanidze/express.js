const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'cart.json')

module.exports = class Cart {
    static addProductOnCart(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            };
            if (fileContent) {
                cart = JSON.parse(fileContent);
            }
            const existingIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingIndex];
            if (existingProduct) {
                cart.products[existingIndex].qty = cart.products[existingIndex].qty + 1;
            } else {
                cart.products.push({ id: id, qty: 1 });
            }

            cart.totalPrice = cart.totalPrice + +productPrice
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        });
    }
}