import nodemailer from "nodemailer";
const sendEmail = async function (email, subject, message) {
    try {
        let transporter = nodemailer.createTransport({
            // host:process.env.SMTP_HOST,
            // port:process.env.SMTP_PORT,
            // secure:false, /// true for 465 or false for other
            service: "gmail",
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_FROM_EMAIL, ///sender address
            to: email,/// user email
            subject: subject,/// Message
            html: message,/// html body
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

};

export default sendEmail;