const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serve static files with correct MIME types
const staticPath = path.join(__dirname, 'scam-scam/dist');
console.log(`Serving static files from: ${staticPath}`); // Add this line

app.use(express.static(staticPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));

// Catch-all route to serve index.html for React Router
app.get('{/*path}', (req, res) => {
  const indexPath = path.join(__dirname, 'scam-scam/dist/index.html');
  console.log(`Serving index.html from: ${indexPath}`); // add this line.
  res.sendFile(indexPath);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});