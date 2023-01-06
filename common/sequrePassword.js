const bcrypt = require('bcrypt')

exports.strongPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}
exports.comparePassword = async (oldPassword, newPassword) => {
return await bcrypt.compare(oldPassword, newPassword)
}