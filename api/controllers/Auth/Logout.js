const User = require('../../models/User')

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (user) {
      user.active = false
      await user.save()
      const accountData = {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_pic: user.profile_pic,
      }
      res.status(201).json({ message: 'Logout successfully', account: accountData })
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something was wrong' })
  }
}
