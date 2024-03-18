const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Sample data - replace with actual database integration
let submissions = [];

// Endpoint for handling form submissions
app.post('/submit-code', (req, res) => {
    const { username, language, stdin, sourceCode } = req.body;

    // Store the submitted data
    submissions.push({
        username,
        language,
        stdin,
        sourceCode,
        timestamp: new Date()
    });

    res.status(201).json({ message: 'Code submitted successfully' });
});

// Endpoint for fetching submitted entries
app.get('/submitted-entries', (req, res) => {
    res.json(submissions);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
