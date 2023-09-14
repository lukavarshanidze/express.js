const express = require('express');
const Product = require('../models/product');

const router = express.Router();
const adminControllers = require('../controllers/admin');

router.get("/add-product", adminControllers.getAddProducts);

router.post("/add-product", adminControllers.postAddProducts);

router.get("/products", adminControllers.getAdminAddProducts);

router.get("/edit-product/:id", (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/')
    }
    Product.findById(req.params.id, (product) => {
        console.log('ess',product);
        res.render('admin/edit-product', { product: product, pageTitle: 'Edit Product', path: '/admin/products', editMode })
    });
});

router.post("/edit-product", (req, res, next) => {
    const prodId = req.body.productId;
    const newTitle = req.body.title;
    const newImage = req.body.imageUrl;
    const newPrice = req.body.price;
    const newDesc = req.body.description;
    const newObj = {title: newTitle, imageUrl: newImage, price: newPrice, description: newDesc, id: prodId}
    Product.updateProduct(newObj)
    res.redirect('/admin/products')
});


module.exports = router;