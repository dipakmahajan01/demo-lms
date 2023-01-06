const express = require('express')
const { createStudent, getStudent, updateStudent, deleteStudent } = require('../controller/studentController')
const { auth } = require('../middleware/auth')
const router = express.Router()
router.post('/create_student', auth, createStudent)
router.get('/get_student', auth, getStudent)
router.put('/update_student', auth, updateStudent)
router.delete('/delete_student', auth, deleteStudent)
module.exports = router