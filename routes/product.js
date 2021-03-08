const express = require('express');
const router = express.Router();
const {getProducts,newProduct, updateProduct, deleteStock, removeProduct, getProductById, addInStock, getProductsName} = require('../controllers/product');


router.get('/Products',getProducts);
router.get('/Products/:id',getProductById);
router.post('/newProduct',newProduct);

router.put('/updateProduct',updateProduct);
router.put('/deleteStock/:id',deleteStock);
router.delete('/deleteProduct/:id',removeProduct);
router.put('/addInStock/:id',addInStock);
router.get('/productName',getProductsName);

module.exports = router;