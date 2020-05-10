const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
  send: (data) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })
    // eslint-disable-next-line prefer-const
    let response = []
    console.log(data)
    const mailOptions = {
      from: process.env.EMAIL,
      to: data.email,
      subject: 'CARRENT Partner Account Confirmation',
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
              * {
                  font-family: sans-serif;
              }
              h2 {
                  text-align: center;
                  background: #c82022;
                  width: 500px;
                  height: 60px;
                  line-height: 60px;
                  margin: 30px auto;
                  color: #fff;
                  border-radius: 10px;
              }
              .link {
                  display: inline-block;
                  width: 250px;
                  height: 40px;
                  line-height: 40px;
                  text-decoration: none;
                  color: #ffffff !important;
                  font-weight: bold;
                  text-align: center;
                  background: #c82022;
                  margin-left: 40%;
                  border-radius: 10px;
              }
              .link-1{
                  text-decoration: none;
              }
          </style>
      </head>
      <body>
          <h2>Verifikasi Alamat Email Rentaller</h2>
          <p>${data.rental_name} telah mendaftar sebagai partner CARRENT Rentaller.
          Mohon verifikasi email partner dengan mengklik link dibawah ini,agar partner bisa segera memasang iklan rental mobilnya.
          Klik tombol dibawah atau <a href="${process.env.ACTIVATION_RENTALLER + data.encrypt}" class="link-1">link ini</a> untuk mengaktifkan akun</p>
              <a href="${process.env.ACTIVATION_RENTALLER + data.encrypt}" class="link">Verifikasi Alamat Email</a>
      </body>
      </html>`
    }

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        response.message = 'email failed'
      } else {
        response.status = 200
        response.error = false
        response.message = 'Successfully send email nodemailer'
      }
    })
    return response
  }

}
