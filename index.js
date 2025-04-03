const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'scam-scam/dist')));

// Catch-all route to serve index.html for React Router
app.get('{/*path}', (req, res) => {
    res.sendFile(path.join(__dirname, 'scam-scam/dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
