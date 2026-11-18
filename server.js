
// Import the required packages
const express = require('express');
require('dotenv').config();

// Create an Express application
const app = express();

// Get the port from the .env file
const PORT = process.env.PORT || 3000;

// Middleware to read JSON data
app.use(express.json());



// Custom middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// GET route: Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Serve static HTML files
app.use(express.static('public'));

// POST route: Accept user information
app.post('/user', (req, res) => {
    const { name, email } = req.body;

    // Check if name or email is missing
    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required'
        });
    }

    // Send greeting response
    res.json({
        message: `Hello, ${name}!`
    });
});

// GET route: Get user profile by ID
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    res.send(`User ${userId} profile`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
