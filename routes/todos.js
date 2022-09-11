const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

// get todos/heatmap
router.get('/heatmap', todosController.getHeatmap)

// post to todos/add
router.post('/add', todosController.addAssignment)

router.post('/createTodo', todosController.createTodo)

router.get('/edit/:id', todosController.getEdit)

router.post('/edit/:id', todosController.updateTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router