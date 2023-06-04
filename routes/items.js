const express = require('express');
const router = express.Router();
const Item = require('../models/items');

// Get all items
router.get('/', (req, res) => {
  Item.find()
    .then(items => {
      res.json(items);
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while retrieving items.' });
    });
});


// Get an item by ID
router.get('/:id', (req, res) => {
    const itemId = req.params.id;
    Item.findById(itemId)
      .then(item => {
        if (!item) {
          res.status(404).json({ error: 'Item not found.' });
        } else {
          res.json(item);
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while retrieving the item.' });
      });
  });



  // Create a new item
router.post('/', (req, res) => {
    // Request body contains item data
    const itemData = req.body;
    Item.create(itemData)
      .then(item => {
        res.status(201).json(item);
      })
      .catch(error => {
        res.status(404).json({ error: 'An error occurred while creating the item.' });
      });
  });



  // Update an item
router.put('/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItemData = req.body;
    Item.findByIdAndUpdate(itemId, updatedItemData, { new: true })
      .then(updatedItem => {
        if (!updatedItem) {
          res.status(404).json({ error: 'Item not found.' });
        } else {
          res.json(updatedItem);
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while updating the item.' });
      });
  });


  // Delete an item
router.delete('/:id', (req, res) => {
    const itemId = req.params.id;
    Item.findByIdAndRemove(itemId)
      .then(removedItem => {
        if (!removedItem) {
          res.status(404).json({ error: 'Item not found.' });
        } else {
          res.json(removedItem);
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while deleting the item.' });
      });
  });

  module.exports = router;