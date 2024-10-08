const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' folder

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Set up nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: `New message from ${name}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email.');
        }
        res.status(200).send('Message sent successfully.');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
