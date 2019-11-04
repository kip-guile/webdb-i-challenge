const express = require('express');

const db = require('../dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts') 
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json({ message: 'this went wrong: ' + error.message });
      });
});

router.get('/:id', async (req, res) => {
    try {
      const result = await db('accounts').where({ id: req.params.id });
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ message: 'this went wrong: ' + error.message });
    }
});

router.post('/', async (req, res) => {
    try {
      const result = await db('accounts')
        .insert({
          name: req.body.name,
          budget: req.body.budget,
        })
      res.json('New account got created with an id of ' + result[0]);
    } catch (error) {
      res.status(500).json({ message: 'this went wrong: ' + error.message });
    }
  });


  router.put('/:id', (req, res) => {
    db('accounts').where({ id: req.params.id })
      .update({
        name: req.body.name,
        budget: req.body.budget,
      })
      .then(affectedAccounts => {
        console.log(affectedAccounts);
        res.json(affectedAccounts + ' accounts got changed!' );
      })
      .catch(error => {
        res.status(500).json({ message: 'this went wrong: ' + error.message });
      });
  });


module.exports = router;