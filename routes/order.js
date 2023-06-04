const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Get all orders
router.get('/', (req, res) => {
  Order.find()
    .then(orders => {
      res.json(orders);
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while retrieving orders.' });
    });
});


// Get an order by ID
router.get('/:id', (req, res) => {
    const orderId = req.params.id;
    Order.findById(orderId)
      .then(order => {
        if (!order) {
          res.status(404).json({ error: 'Order not found.' });
        } else {
          res.json(order);
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while retrieving the order.' });
      });
  });


  // Create a new order
  router.post('/', (req, res) => {
    // Request body contains order data
    const orderData = req.body;
    Order.create(orderData)
      .then(order => {
        res.status(201).json(order);
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while creating the order.' });
      });
  });



  // Update an order
router.put('/:id', (req, res) => {
    const orderId = req.params.id;
    const updatedOrderData = req.body;
    Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true })
      .then(updatedOrder => {
        if (!updatedOrder) {
          res.status(404).json({ error: 'Order not found.' });
        } else {
          res.json(updatedOrder);
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while updating the order.' });
      });
  });

  // Delete an order
router.delete('/:id', (req, res) => {
    const orderId = req.params.id;
    Order.findByIdAndRemove(orderId)
      .then(removedOrder => {
        if (!removedOrder) {
          res.status(404).json({ error: 'Order not found.' });
        } else {
          res.json(removedOrder);
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while deleting the order.' });
      });
  });
  
  module.exports = router;