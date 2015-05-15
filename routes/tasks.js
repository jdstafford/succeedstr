var express = require('express');
var router = express.Router();
var config = require('../config');
var r = require('rethinkdbdash')(config.rethinkdb);
var request = require('request');

r.db(config.rethinkdb.db).tableList().contains('todos').run().then(function(result){
  if (!result) {
    r.db(config.rethinkdb.db).tableCreate('todos').run().then(function(){
      r.table('todos').indexCreate('createdAt').run();
    });
  }
});

router.get('/', function(req, res, next) {
  // list all tasks
  r.table('todos').orderBy({index: 'createdAt'}).run().then(function(err, result) {
    if(err) {
      console.log(err);
    }
    result = result || [];
    res.render('tasks/index', {title: config.title, tasks: result});
  });
});

router.get('/completed', function(req, res, next) {
  console.log('this');
  var result = []; // fix this
  res.render('tasks/completed', {title: config.title, tasks: result});
});

// view a specific task
router.get('/:task_id', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  // create a task
  try {
      var taskId = req.body.task_id,
          toDo = req.body.to_do;

      r.table('todos').insert({
          taskId : taskId,
          todo : toDo
      }).run().then(function(result) {
          var message = {
              title : taskId,
              todo : toDo
          };

          request.post({
              url : config.publish.endpoint,
              json : true,
              body : message
          }, function(err, message, reqRes) {
              if (err) {
                  throw err;
              }
              res.status(200).json({ error : 'none' });
          });

      });
  } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
  }
});

router.put('/:task_id', function(req, res, next) {
  // update a task
  res.send('respond with a resource');
});

router.delete('/:task_id', function(req, res, next) {
  // delete a task
  res.send('respond with a resource');
});

module.exports = router;
