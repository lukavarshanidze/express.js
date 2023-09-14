const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render("admin/edit-product", { pageTitle: 'Add Product', path: '/admin/add-product', editMode: false });
};

exports.getAdminAddProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        console.log('productssss', products);
        res.render("admin/products", { prods: products, pageTitle: 'Admin Products', path: '/admin/products' });
    });
};

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const products = new Product(title, imageUrl, price, description);
    products.save();
    res.redirect('/')
};