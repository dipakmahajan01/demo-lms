const express = require('express')
const router = express.Router()
const admin = require('./admin.js')
const school = require('./school.js')
const faculty = require('./faculty.js')
const student = require('./student.js')
router.use('/admin', admin)
router.use('/school', school)
router.use('/faculty', faculty)
router.use('/student', student)





module.exports = router
