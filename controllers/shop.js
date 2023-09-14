const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/index", { prods: products, pageTitle: 'Shop', path: '/' })
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', { prods: products, pageTitle: 'Product List', path: '/products' })
    });
};

exports.getProductDetails = (req, res, next) => {
    Product.fetchAll(products => {
        const product = products.find(prod => prod.id === req.params.id);
        res.render('shop/product-detail', { product: product, pageTitle: 'Product Details', path: '/products' })
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', { pageTitle: 'Cart', path: '/cart' })
};

exports.postCart = (req, res, next) => {
    const productID = req.body.productId;
    const price = req.body.productPrice;
    Cart.addProductOnCart(productID, price);
    res.redirect('/cart')
};

exports.getOrders = (req, res, next) => {
    res.render("shop/orders", { pageTitle: 'Orders', path: '/orders' })
};

exports.getEdit = (req, res, next) => {
    const id = req.params.currentId;
    Product.fetchAll((products) => {
        const current = products.find(p => p.id === id);
        if (current) {
            console.log(current);
            res.render('shop/edit', { current: current })
        }
    });

};