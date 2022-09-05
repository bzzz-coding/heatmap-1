const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  // new ---- 
  date: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: String,
    default: '0'
  },
  // ---- new
  userId: {
    type: String,
    required: true
  }
})

// Todo is the model, the schema is a blueprint, the model uses the blueprint to build the database
module.exports = mongoose.model('Todo', TodoSchema)
