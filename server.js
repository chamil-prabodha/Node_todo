/**
 * Created by Chamil Prabodha on 01/05/2016.
 */

var mongoose = require('mongoose');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

mongoose.connect('mongodb://localhost/test');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());




var Todo = mongoose.model('Todo',{
    text:String
});

// API
// Routes----------------------------------------------------------------

var router = express.Router();

router.get('/api/todos',function(req,res) {

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
});

//get all todos

//create a todo and view all todos
router.post('/api/todos',function(req,res){

    Todo.create({
        text: req.body.text,
        done: false
    }, function(err,todo){
        if(err)
            res.send(err);

        Todo.find(function(err,todos){
            if(err)
                res.send(err);

            res.json(todos);
        });
    });
});

//delete a todo
router.delete('/api/todos/:todo_id', function (req,res) {

    Todo.remove({
        _id: req.params.todo_id
    },function(err,todo){
        if(err)
            res.send(err);

        Todo.find(function(err,todos){
            if(err)
                res.send(err);

            res.json(todos);
        });
    });
});

router.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.use('/',router);
app.listen(8081);
console.log('Server running on port 8081');


