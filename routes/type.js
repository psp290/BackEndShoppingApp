const express = require('express');
const { newType, getType, getTypeById } = require('../controllers/type');

const router = express.Router();

router.get('/Types',getType);
router.get('/Types/:id',getTypeById);
router.post('/newType',newType);


module.exports = router;