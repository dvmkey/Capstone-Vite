const express = require('express');
const path = require('path')
const app = express();
app.use(express.json());
app.use(express.static('scam-scam/dist'));
const port = process.env.PORT || 8080;

// Serve static files from the 'scam-scam/dist' directory
app.use(express.static(path.join(__dirname, 'scam-scam/dist')));

// Explicitly handle React routes
app.get(['/', '/login', '/phone-list-manager', '/saved-calls', '/performance'], (req, res) => {
    res.sendFile(path.join(__dirname, 'scam-scam/dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});