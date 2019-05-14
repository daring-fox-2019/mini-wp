const bcrptjs = require('bcryptjs')

module.exports = {
    hashSync(thisPassword) {
        // DI MODEL USER
        // Hashing password dilakukan di model (user), saat register
        return bcrptjs.hashSync(thisPassword, 8)
    },
    compareSync(passwordInput, passwordDatabase) {
        // DI CONTROLLER USER
        // Compare password input user dengan hash dilakukan di controller (user), saat sign in
        // Membandingkan password dari input user dari client dengan password user yang ada di database, yang masih berbentuk hash bcryptjs
        return bcrptjs.compareSync(passwordInput, passwordDatabase)
    }
}