const express = require('express');

// database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.select('*')
  .from('accounts')
  .then(acc => {
    res.status(200).json({ data: acc })
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({ error: err.message })
  })
});

router.get('/:id', (req, res) => {
  db('accounts').where('id', req.params.id).first()
  .then(id => {
    res.status(200).json({ data: id })
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({ error: err.message })
  })
});

router.post('/', (req, res) => {
  const data = req.body
  db('accounts')
  .insert(data, 'id') // will need id because postgres with this stupid knex library needs it to return an id
  .then(ids => {
    const id = ids[0]
    db('accounts').where({id}).first()
    .then(post => {
      res.status(201).json({ message: "nice", data: post })
    })
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({ error: err.message })
  })
});

router.put('/:id', (req, res) => {
  const id = req.params.id
  const update = req.body
  db('accounts')
  .where({id}).first()
  .update(update ,'id')
  .then(data => {
    res.status(200).json({ message: "good update", data: data })
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({ error: err.message })
  })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id
  db('accounts').where({id})
  .del()
  .then(count => {
    if(count > 0) {
      res.status(200).json({ message: "good delete" })
    } else {
      res.status(404).json({ message: `no accounts at id ${id}`})
    }
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({ error: err.message })
  })
});

module.exports = router;