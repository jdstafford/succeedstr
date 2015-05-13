var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // list all tasks
  res.send('respond with a resource');
});

// view a specific task
router.get('/:task_id', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  // create a task
  res.send('respond with a resource');
});

router.put('/:task_id', function(req, res, next) {
  // update a task
  res.send('respond with a resource');
});

router.delete('/:task_id', function(req, res, next) {
  // delete a task
  res.send('respond with a resource');
});

router.get('/completed', function(req, res, next) {
  // list all completed tasks
  res.send('respond with a resource');
});

module.exports = router;
