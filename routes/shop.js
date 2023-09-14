const express = require('express');

const router = express.Router();
const shopControllers = require('../controllers/shop');

router.get("/", shopControllers.getIndex);

router.get("/products", shopControllers.getProducts);

router.get("/products/:id", shopControllers.getProductDetails);

router.get("/cart", shopControllers.getCart);

router.post("/cart", shopControllers.postCart);

router.get("/orders", shopControllers.getOrders);

router.get('/edit/:currentId', shopControllers.getEdit);

module.exports = router