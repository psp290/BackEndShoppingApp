const express = require('express');
const { placeOrder, getOrderById, orderPacked, orderShipped, orderDelivered, getAllOrders, adminOrders } = require('../controllers/order');

const router = express.Router();


router.post('/orderPlaced',placeOrder);
router.get('/getOrderById/:orderId',getOrderById);
router.get('/getAllOrders/:id',getAllOrders);
router.get('/adminOrders',adminOrders);


// admin use

router.put('/orderPacked/:id',orderPacked);
router.put('/orderShipped/:id',orderShipped);
router.put('/orderDelivered/:id',orderDelivered);




module.exports = router;