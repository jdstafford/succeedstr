var express = require('express');
var router = express.Router();
var config = require('../config');
var r = require('rethinkdbdash')(config.rethinkdb);

r.db(config.rethinkdb.db).tableList().contains('todos').run().then(function(result){
  if (!result) {
    r.db(config.rethinkdb.db).tableCreate('todos').run().then(function(){
      r.table('todos').indexCreate('createdAt').run();
    });
  }
});

router.get('/', function(req, res, next) {
  // list all tasks
  r.table('todos').orderBy({index: 'createdAt'}).run().then(function(err, cursor) {
    if(err) {
      return next(err);
    }

    //Retrieve all the todos in an array.
    cursor.toArray(function(err, result) {
      if(err) {
        return next(err);
      }

      res.json(result);
    });
  });
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
