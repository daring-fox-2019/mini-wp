
const nodemailer = require('nodemailer')

module.exports = {
    Mailer: (Email) => {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tinywp.team@gmail.com',
                pass: 'percayalahinipassword'
            }
        })

        let mailOption = {
            from: 'tinywp.team@gmail.com',
            to: Email.penerima,
            subject: Email.judul,
            text: Email.text
        }

        transporter.sendMail(mailOption, function (err, res) {
            if (err) {
                console.log('Error')
            } else {
                console.log('email send')
            }
        })
    }
}







