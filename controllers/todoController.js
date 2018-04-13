var bodyParser= require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/todo');

//create schema
var todoSchema= new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var data=[{item:'get milk'},{item:'get walk'},{item:'go market'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){
    
    app.get('/todo', function(req,res){
        //get data from db
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos:data});
            
        });
    });

    app.post('/todo', urlencodedParser, function(req,res){
        //get data from view and add it to db
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });

        //old one
        // data.push(req.body);
        // res.render('todo', {todos:data});
        // res.json(data);
    });

    app.delete('/todo/:item', function(req,res){

        Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });

        //old one
        // data =  data.filter(function(todo){
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
    });

    app.delete('/todo/delete/:id', function(req,res){

        Todo.find({_id:req.params.id}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
       

        //old one
        // data =  data.filter(function(todo){
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
    });

}