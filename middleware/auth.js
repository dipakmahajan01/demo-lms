const jwt = require('jsonwebtoken')
const AdminModel = require('../model/adminModel')
exports.auth = (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Access token not found'
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded) {
            return res.status(401).json({
                status: 'error',
                message: 'token is expired'
            })
        }
        req.user = decoded
        const admin = AdminModel.findOne({ _id: req.user._id })
        if (admin._id !== req.user.id) {
            return res.status(401).json({
                status: 'error',
                message: 'user is not admin'
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
