const StudentModel = require('../model/studentModel.js')


exports.createStudent = async (req, res) => {
    try {

        const { name, email, school, faculty } = req.body
        let student = await StudentModel.findOne({ email: email })
        console.log(student)
        if (student) {
            return res.status(400).json({
                error: 'Student already exists'
            })
        }
        student = await StudentModel.create({
            name,
            email,
            school,
            faculty
        })
        return res.status(200).json({ message: 'success', data: student })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}
exports.getStudent = async (req, res) => {
    try {
        const student = await StudentModel.find().populate("school")
        if (!student) {
            return res.status(404).json({ error: 'Student not found' })
        }
        return res.status(200).json({ message: 'success', data: student })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
exports.updateStudent = async (req, res) => {
    try {
        const { _id, name, email, school, faculty } = req.body
        let student = await StudentModel.findOne({ _id: _id })
        if (!student) {
            return res.status(404).json({ error: 'Student not found' })
        }
        student.name = name
        student.email = email
        student.school = school
        student.faculty = faculty
        await student.save()
        return res.status(200).json({ message: 'success', data: student })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const { _id } = req.body
        const student = await StudentModel.findByIdAndDelete({ _id: _id })
        if (!student) {
            return res.status(404).json({ error: 'Student not found' })
        }
        return res.status(200).json({ message: 'successfully deleted', data: student })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}