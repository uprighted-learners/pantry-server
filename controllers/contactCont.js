const nodemailer = require("nodemailer");
const ContactForm = require("../models/ContactForm");

const contactFormEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newMessage = new ContactForm({ 
            name, 
            email, 
            message 
        });
        
        await newMessage.save();

        // This creates a fake Ethereal email account for testing/dev purposes
        // A behind the scenes action that generates an object for user id and password
        // Decided against gmail, but if we used that we'd have .env variables for user and password instead of this testAccount
        const testAccount = await nodemailer.createTestAccount();

        // nodemailer's object for sending the email
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email", // email server
            port: 587, // standard for secure connections (TLS: transport layer security)
            auth: { // login info
                user: testAccount.user, // temporary creds created by createTestAccount fx
                pass: testAccount.pass // only avail while running server
            }
        });

        const mailOptions = {
            from: `"${name}" <${email}>`, // the person filling out the form
            to: testAccount.user, // our email, in this case ethereal
            subject: "New Contact Form Message",
            text: ` 
            Name: ${name}
            Email: ${email}
            Message: ${message}
            `
            // ^^ renders as a plain text body, "Just the facts, ma'am, just the facts..."
        };

        const info = await transporter.sendMail(mailOptions);
        //console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

        res.status(200).json({
            message: "Email sent and saved successfully!",
            preview: nodemailer.getTestMessageUrl(info) // sends link to view the test email(it's an ethereal thing)
        });

    } catch (err) {
        console.log("Contact form error:", err);
        res.status(500).json({ 
            message: "Failed to send email"
        });
    }
};



module.exports = { contactFormEmail };