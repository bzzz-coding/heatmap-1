const mongoose = require('mongoose')

const AssignmentSchema = new mongoose.Schema({
  completed: [{type: String}],
  date: {
    type: Date,
    default: Date.now
  },
  // ---- new
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Assignment', AssignmentSchema)
