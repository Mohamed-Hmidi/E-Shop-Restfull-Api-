const express = require('express');
const router = express.Router();
const User = require('../models/users');


// Get all users
router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
        res.status(500).json({ error: 'An error occurred while retrieving users.' });
    });
});

// Get a user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'User not found.' });
      } else {
        res.json(user);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while retrieving the user.' });
    });
});

/*
// Create a new user


/*
router.post('/',async (req,res)=>{
  let user= new user ({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    role:req.body.role,
    isActive:req.body.isActive

  })

  user = await user.save()
  .then(user => {
    res.status(201).json(user);
  })
  if (!user)
  return res.status(500).json({ error: 'An error occurred while creating the user.' });
res.send(user);
});

*/


router.post('/', (req, res) => {
  const userData = req.body;
 
  
  User.create(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while creating the user.' });
    });
});





  // Update a user
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
    User.findByIdAndUpdate(userId, updatedUserData, { new: true })
      .then(updatedUser => {
        if (!updatedUser) {
          res.status(404).json({ error: 'User not found.' });
        } else {
          res.json(updatedUser);
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while updating the user.' });
      });
  });


  // Delete a user
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(removedUser => {
        if (!removedUser) {
          res.status(404).json({ error: 'User not found.' });
        } else {
          res.json(removedUser);
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while deleting the user.' });
      });
  });
  
  module.exports = router;


  