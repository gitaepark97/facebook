const User = require('../../models/User')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
  let { currentPassword, newPassword } = req.body
  try {
    const user = await User.findById(req.userId)
    let matchPassword = await bcrypt.compare(currentPassword, user.password)
    if (!matchPassword) {
      return res.status(400).json({ error: 'Current password is incorrect please try again' })
    }
    if (!newPassword) {
      return res.status(400).json({ error: 'Current password is required' })
    }
    let generatePasswordHash = await bcrypt.hash(newPassword, 8)
    user.password = generatePasswordHash
    await user.save()
    res.status(200).json({ message: 'Password updated successfully' })
  } catch (err) {
    return res.status(500).json({ error: 'Something was wrong' })
  }
}
