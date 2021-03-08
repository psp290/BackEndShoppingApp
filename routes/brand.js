const express = require('express');
const {getBrand, newBrand, getBrandById} = require('../controllers/brand');
const router = express.Router();


router.get('/Brands',getBrand);
router.get('/Brands/:id',getBrandById);
router.post('/newBrand',newBrand);


module.exports = router;

