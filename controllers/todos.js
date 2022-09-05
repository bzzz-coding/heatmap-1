const Todo = require('../models/Todo')

module.exports = {

    getTodos: async (req,res) => {
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id}).sort({ "completed": 1, "priority": -1, "date": 1 })
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        } catch(err) {
            console.log(err)
        }
    },

    createTodo: async (req, res)=>{
        try{
            // using the Todo model based on the schema, create a new todo item
            await Todo.create({
                todo: req.body.todoItem, 
                completed: false, 
                priority: req.body.priority,
                userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },

    getEdit: async (req, res) => {
        const id = req.params.id;
        console.log(id)
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id, completed: false})
            res.render('edit.ejs', {todos: todoItems, left: itemsLeft, user: req.user, idOfItem: id})
        } catch(err) {
            console.log(err)
        }
    },

    updateTodo: async (req, res) => {
        const id = req.params.id
        try {
            await Todo.findByIdAndUpdate( id, {
                todo: req.body.todoItem,
                priority: req.body.priority
            })
            console.log(`todo item updated, id: ${id}`)
            res.redirect('/todos')
        } catch(err) {
            console.log(err)
        }
    },

    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    