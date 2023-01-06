const AdminModel = require('../model/adminModel')
const jwt = require('jsonwebtoken')
const { strongPassword, comparePassword } = require('../common/sequrePassword')
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body
    let admin = await AdminModel.findOne({ email: email })
    if (admin) {
      return res.status(400).json({ error: 'admin already exits' })
    }
    const strongPassword2 = await strongPassword(password)
    admin = await AdminModel.create({
      name,
      email,
      password: strongPassword2
    })
    return res.status(201).json({ message: 'success', data: admin })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await AdminModel.findOne({ email: email })
    if (!admin) {
      return res.status(400).json({ error: 'admin not found' })
    }
    if (email !== admin.email) {
      return res.status(400).json({ error: 'email not match' })
    }
    const isMatch = await comparePassword(password, admin.password)
    console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' })
    }
    const token = jwt.sign({
      _id: admin._id,
      email: admin.email,
    }, process.env.SECRET_KEY, {
      expiresIn: '3h'
    })
    return res.status(200).json({ message: 'success', token: token })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}