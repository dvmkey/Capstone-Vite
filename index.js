const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serve static files with correct MIME types
app.use(express.static(path.join(__dirname, 'scam-scam/dist'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));

// Catch-all route to serve index.html for React Router
app.get('{/*path}', (req, res) => {
    res.sendFile(path.join(__dirname, 'scam-scam/dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
