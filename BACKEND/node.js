// server.js

const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Redis client
const redisClient = redis.createClient();

// Middleware
app.use(bodyParser.json());

// Endpoint for submitting code
app.post('/submit-code', (req, res) => {
    // Logic for submitting code to the database...
});

// Endpoint for fetching submitted entries with Redis caching
app.get('/submitted-entries', (req, res) => {
    // Check if data is cached in Redis
    redisClient.get('submitted-entries', (err, data) => {
        if (err) {
            console.error('Error retrieving data from Redis:', err);
            // If error occurs, fetch data from the database
            // and return it to the client
            fetchEntriesFromDatabase(req, res);
        } else {
            if (data) {
                // If data is cached, return it to the client
                console.log('Data retrieved from Redis cache');
                res.json(JSON.parse(data));
            } else {
                // If data is not cached, fetch it from the database
                // and cache it in Redis before returning it to the client
                fetchEntriesFromDatabase(req, res);
            }
        }
    });
});

// Function to fetch entries from the database
function fetchEntriesFromDatabase(req, res) {
    // Logic to fetch entries from the database...
    const entries = [
        // Sample entries from the database
        { id: 1, username: 'user1', language: 'JavaScript', stdin: 'input1', sourceCode: 'code1', timestamp: '2024-03-17 12:00:00' },
        { id: 2, username: 'user2', language: 'Python', stdin: 'input2', sourceCode: 'code2', timestamp: '2024-03-17 12:30:00' }
    ];

    // Cache entries in Redis
    redisClient.setex('submitted-entries', 3600, JSON.stringify(entries));

    // Return entries to the client
    res.json(entries);
}

// Endpoint for executing code using Judge0 API
app.post('/execute-code', async (req, res) => {
    try {
        // Call Judge0 API with submitted source code
        const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
            source_code: req.body.sourceCode,
            language_id: req.body.languageId,
            stdin: req.body.stdin,
            // Add any other necessary parameters
        }, {
            headers: {
                'x-rapidapi-key': 'YOUR_API_KEY',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        });

        // Extract code execution output from response
        const output = response.data.stdout;

        // Return output to the client
        res.json({ output });
    } catch (error) {
        console.error('Error executing code:', error);
        res.status(500).json({ error: 'Error executing code' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
