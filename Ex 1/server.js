const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    // Process the contact form data (e.g., send an email)
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    res.send('Message received');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

