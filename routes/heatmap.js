const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const heatmapController = require('../controllers/heatmap')
const { ensureAuth } = require('../middleware/auth')

// router.get('/', ensureAuth, todosController.getTodos)

// get /heatmap
router.get('/', ensureAuth, heatmapController.getHeatmap)

// post to todos/add
router.post('/add', heatmapController.addAssignment)

router.post('/createTodo', todosController.createTodo)

router.get('/edit/:id', todosController.getEdit)

router.post('/edit/:id', todosController.updateTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router