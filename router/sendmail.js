
 const sendmail= (useremail , password)=>{
 const nodemailer = require('nodemailer');
require('dotenv').config()
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,   
        service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
    })
    
    message = {
        from: "mcodewith@gmail.com",
        to: `${useremail}`,
        subject: "testing",
        text: `${useremail}  you have been registred succesfully and your password is ${password}`
    }

    transporter.sendMail(message, function(err, info) {
        if (err) {
          console.log( "erro=> " + err)
        } else {
          console.log(info );
        }

   })
}

module.exports=sendmail