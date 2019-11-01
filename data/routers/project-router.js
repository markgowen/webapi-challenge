const express = require('express');

const projectDb = require('../helpers/projectModel');

const router = express.Router();

// GET request for all projects
router.get('/', (req, res) => {
  projectDb
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'The projects could not be retrieved.' });
    });
});

// POST request to add a project
router.post('/', (req, res) => {
  projectDb
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error adding project' });
    });
});

module.exports = router;
