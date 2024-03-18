const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

// Connect to the database
connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Function to insert a new submission into the database
exports.createSubmission = (submission, callback) => {
    const { username, language, stdin, sourceCode } = submission;
    const query = 'INSERT INTO submissions (username, language, stdin, sourceCode) VALUES (?, ?, ?, ?)';
    connection.query(query, [username, language, stdin, sourceCode], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

// Function to retrieve all submissions from the database
exports.getAllSubmissions = (callback) => {
    const query = 'SELECT * FROM submissions';
    connection.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};
