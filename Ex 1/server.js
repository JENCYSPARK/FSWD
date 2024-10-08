const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/about', (req, res) => {
    res.json({
        name: "Your Name",
        profession: "Web Developer",
        skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
        bio: "A brief bio about yourself.",
        contact: "your.email@example.com"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
