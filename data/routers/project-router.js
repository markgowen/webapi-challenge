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

router.get('/:id', (req, res) => {
  projectDb.get(req.params.id).then(project => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
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

// PUT request to update an existing project
router.put('/:id', (req, res) => {
  projectDb
    .update(req.params.id, req.body)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error updating project' });
    });
});

// DELETE request to remove an existing project
router.delete('/:id', (req, res) => {
  projectDb
    .remove(req.params.id)
    .then(count => {
      if (!count) {
        res.status(404).json({
          message: 'The project with the specified ID does not exist'
        });
        return;
      }
      res.status(200).json({ message: 'Successfully deleted proejct' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'The project could not be removed' });
    });
});

module.exports = router;
