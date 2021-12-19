const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Notification', notificationSchema)
