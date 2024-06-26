const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const mailService = {
    async sendEmail({ emailFrom, emailTo, subject, html }) {
        console.log("====",process.env.EMAIL_USER, process.env.PASSWORD_USER)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT, // Đảm bảo cổng là số
            // secure: process.env.SMTP_SECURE === 'true', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASSWORD_USER,
            },
        });

        try {
            let info = await transporter.sendMail({
                from: emailFrom,
                to: emailTo,
                subject: subject,
                html: html,
            });
            console.log('Email sent: %s', info.messageId);
            return { message: 'Email sent successfully', messageId: info.messageId };
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
};

Object.freeze(mailService);
module.exports = { mailService };
