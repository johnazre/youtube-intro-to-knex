var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8001;
var knex = require('./knexfile');
var cors = require('cors');
var logger = require('morgan');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/todos', function(req, res) {
  knex.select()
      .from('todos')
      .then(function(todos) {
        res.send(todos);
      })
})

app.get('/todos-of-user/:id', function(req, res) {
  knex.from('todos')
      .innerJoin('users', 'todos.user_id', 'users.id')
      .where('todos.user_id', req.params.id)
      .then(function(data) {
        res.send(data)
      })
})

app.get('/todos/:id', function(req, res) {
  knex.select()
      .from('todos')
      .where('id', req.params.id)
      .then(function(todos) {
        res.send(todos);
      })
})

app.post('/todos', function(req, res) {
  knex('todos').insert({
    title: req.body.title,
    user_id: req.body.user_id
  })
  .then(function() {
    knex.select()
        .from('todos')
        .then(function(todos) {
          res.send(todos);
        })
  })
})

app.put('/todos/:id', function(req, res) {
  knex('todos').where('id', req.params.id)
              .update({
                title: req.body.title,
                completed: req.body.completed
              })
              .then(function() {
                knex.select()
                    .from('todos')
                    .then(function(todos) {
                      res.send(todos);
                    })
              })
})

app.delete('/todos/:id', function(req, res) {
  knex('todos').where('id', req.params.id)
               .del()
               .then(function() {
                 knex.select()
                     .from('todos')
                     .then(function(todos) {
                       res.send(todos);
                     })
               });
})



app.listen(port, function() {
  console.log("listening on port: ", port);
})
