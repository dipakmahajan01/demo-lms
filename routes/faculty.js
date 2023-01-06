const express = require('express')
const { createFaculty, getFaculty, updateFaculty, deleteFaculty } = require('../controller/facultyController')
const { auth } = require('../middleware/auth')
const router = express.Router()
router.post('/create_faculty', auth, createFaculty)
router.get('/get_faculty', auth, getFaculty)
router.put('/update_faculty', auth, updateFaculty)
router.delete('/delete_faculty', auth, deleteFaculty)
module.exports = router