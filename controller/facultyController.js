const facultyModel = require('../model/facultyModel')
const StudentModel = require('../model/studentModel')


exports.createFaculty = async (req, res) => {
    try {
        const { name, email, school } = req.body
        let faculty = await facultyModel.findOne({ email: email })
        if (faculty) {
            return res.status(400).json({ error: 'faculty already exists' })
        }
        faculty = await facultyModel.create({
            name,
            email,
            school
        })
        return res.status(200).json({ message: 'success', data: faculty })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}
exports.getFaculty = async (req, res) => {
    try {
        const faculty = await facultyModel.find({})
        if (!faculty) {
            return res.status(404).json({ error: 'not found' })
        }
        return res.status(200).json({ message: 'success', data: faculty })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
exports.updateFaculty = async (req, res) => {
    try {
        const { _id, name, email, school } = req.body
        let faculty = await facultyModel.findOne({ _id: _id })
        if (!faculty) {
            return res.status(400).json({ error: 'faculty not found' })
        }
        faculty.name = name,
            faculty.school = school
        faculty.email = email
        await faculty.save()
        return res.status(200).json({ message: 'success', data: faculty })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
exports.deleteFaculty = async (req, res) => {
    try {
        const { _id } = req.body
        const faculty = await facultyModel.findOneAndDelete({ _id: _id })
        if (!faculty) {
            return res.status(200).json({ error: ' faculty not found' })
        }
        const student = await StudentModel.findOneAndDelete({ faculty: _id })
        console.log(student)
        if (!student) {
            return res.status(404).json({ error: ' student not found' })
        }
        return res.status(200).json({ message: 'successfully delete', data: faculty, data2: student })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}