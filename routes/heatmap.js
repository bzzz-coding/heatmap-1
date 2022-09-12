const express = require('express')
const router = express.Router()
const heatmapController = require('../controllers/heatmap')
const { ensureAuth } = require('../middleware/auth')


// get /heatmap
router.get('/', ensureAuth, heatmapController.getHeatmap)

// get edit page for requested date /edit/:date
router.get('/edit/:date', heatmapController.getEdit)

// post to todos/add
router.post('/add', heatmapController.postAssignment)


// delete
router.delete('/delete', heatmapController.deleteEntry)


module.exports = router