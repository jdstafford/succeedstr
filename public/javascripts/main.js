$(document).ready(function() {

  $('.taskList').load('/tasks/data');

  $('.addTask').click(function() {
    $.post('/tasks', {
      'todo': $('.taskTodo').val()
    }).success(function() {
      $('.taskTodo').val('');
      $('.taskList').load('/tasks/data');
    });
  });



});
