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
  res.render('tasks/index', {title: config.title});
});

router.get('/data', function(req, res, next) {
  // list all tasks
  r.table('todos').orderBy({index: 'createdAt'}).run().then(function(result) {
    try {
      res.render('partials/tasks/list', {tasks: result});
    } catch (e) {
      console.log('Error ' + e);
    }
  });
});

router.get('/completed', function(req, res, next) {
  var result = []; // fix this
  res.render('tasks/completed', {title: config.title, tasks: result});
});

// update a task
router.put('/:task_id', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  // create a task
  try {
      var toDo = req.body.todo;

      r.table('todos').insert({
          todo : toDo,
          createdAt: new Date().toUTCString(),
          deleted: false
      }).run().then(function(result) {
          var message = {
            title : result.generated_keys[0],
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

router.delete('/:task_id', function(req, res, next) {
  // delete a task
  res.send('respond with a resource');
});

module.exports = router;
