const express = require('express');

const actionDb = require('../helpers/actionModel');

const router = express.Router();

router.get('/', validateProjectId, (req, res) => {
  actionDb
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving actions' });
    });
});

router.get('/:id', validateProjectId, (req, res) => {
  actionDb
    .get(req.action.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error retreiving the action' });
    });
});

router.post('/', validateProjectId, (req, res) => {
  const newAction = { ...req.body, project_id: req.params.id };

  actionDb
    .insert(newAction)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error creating action' });
    });
});

router.put('/:id', validateProjectId, (req, res) => {
  const actionInfo = { ...req.body, project_id: req.params.id };

  actionDb
    .update(actionInfo)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error updating action' });
    });
});

router.delete('/:id', validateProjectId, (req, res) => {
  actionDb
    .remove(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error deleting action' });
    });
});

// Middleware
function validateProjectId(req, res, next) {
  if (req.params.id) {
    return;
  } else {
    res.status(404).json({ message: 'invalid project id' });
  }
  next();
}

module.exports = router;
