const jwt = require('jsonwebtoken')

module.exports = {
    sign(object) {
        // SAAT LOGIN BERHASIL
        // dilakukan ketika user sudah input email dan password sesuai dengan database, token akan dibuat dan diberikan ke client
        return jwt.sign(object, process.env.SECRET, { expiresIn: '1 day' })
    },
    verify(token) {
        // SAAT AUTHENTICATION
        // dilakukan di authentication, untuk memastikan token yg diterim dari client di-generate menggunakan secret dari server kita sendiri
        return jwt.verify(token, process.env.SECRET)
        
        // abis itu masih harus findone, untuk pastiin bahwa hasil verify tsb memang sudah ada di database atau belum
        // kalo ternyata belum ya reject
    }
}