const User = require('../../models/User')
const CreateNotification = require('../CreateNotification')

module.exports = async ({ req, key, data, notifi_body }) => {
  const friend = await User.findById(req.userId).populate('friends')
  friend.friends.forEach(async user => {
    if (user.socketId) {
      req.io.to(user.socketId).emit(key, { data })
      if (notifi_body) {
        let notification = await CreateNotification({ user: user._id, body: notifi_body })
        req.io.to(user.socketId).emit('Notification', { data: notification })
      }
    }
  })
}
