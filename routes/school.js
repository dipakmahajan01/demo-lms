const express = require('express')
const router = express.Router()
const { createSchool, getSchool, updateSchool, deleteSchool } = require('../controller/schoolController')
const { auth } = require('../middleware/auth')
router.post('/create_school', auth, createSchool)
router.get('/get_school', auth, getSchool)
router.put('/update_school', auth, updateSchool)
router.delete('/delete_school', auth, deleteSchool)

module.exports = router