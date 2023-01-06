const SchoolModel = require('../model/schoolModel')
const facultyModel = require('../model/facultyModel')
const StudentModel = require('../model/studentModel.js')

exports.createSchool = async (req, res) => {
    try {
        const { name, email } = req.body
        let school = await SchoolModel.findOne({ email: email })
        if (school) {
            return res.status(400).json({
                message: 'school already exists'
            })
        }
        school = await SchoolModel.create({
            name,
            email,
        })
        return res.status(200).json({
            message: 'success',
            data: school
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}
exports.getSchool = async (req, res) => {
    try {
        const school = await SchoolModel.find({})
        if (!school) {
            return res.status(404).json({
                message: 'schoolData not found'
            })
        }
        return res.status(200).json({
            message: 'success',
            data: school
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
exports.updateSchool = async (req, res) => {
    try {
        const { _id, name, email } = req.body
        const school = await SchoolModel.findOne({ _id: _id })
        if (!school) {
            return res.status(404).json({
                message: 'schoolData not found'
            })
        }
        school.name = name
        school.email = email
        await school.save()
        return res.status(200).json({
            message: 'success',
            data: school
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
exports.deleteSchool = async (req, res) => {
    try {
        const { _id } = req.body
        const school = await SchoolModel.findByIdAndDelete({ _id: _id })
        if (!school) {
            return res.status(404).json({
                message: 'schoolData not found'
            })
        }
        const faculty = await facultyModel.findByIdAndDelete({ school: _id })
        if (!faculty) {
            return res.status(404).json({ error: 'faculty not found' })
        }
        const student = await StudentModel.findByIdAndDelete({
            school: _id
        })
        if (!student) {
            return res.status(404).json({ error: 'student not found' })
        }
        return res.status(200).json({
            message: 'successfully deleted',
            data1: school, data2: faculty,
            data3:student
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}