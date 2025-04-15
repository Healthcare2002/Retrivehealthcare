const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Handle contact form submission
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, message } = req.body;
        console.log('Received contact form submission:', { name, email, message });
        res.status(200).json({ message: 'Message received successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error processing message' });
    }
});

// Serve index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the website`);
}); 