const functions = require('firebase-functions');
const router = require('express').Router();
const nodemailer = require('nodemailer');

router.route('/').post((req, res) => {

    const transport = nodemailer.createTransport({
        service: 'gmail',
        host : "smtp.gmail.com",
        port : "465",
        ssl : true,
        auth: {
            user: functions.config().mailing.user, 
            pass: functions.config().mailing.pass
        }
    });

    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const mailOptions = {
        from: email,
        to: 'justinanthony.primary@gmail.com',
        subject: subject,
        text: "FROM: "+ email + " MESSAGE: " + message
    };

    transport.sendMail(mailOptions, (err, info) => {
        err ? res.json(res.status(400).json("Error " + err)) : res.json(res.status(200).json("Email sent"));
    });

});

module.exports = router ;