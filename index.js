require('dotenv').config({path: `${process.cwd()}/.env`});

const express = require('express');
const path = require('path');
const authRouter = require('./route/authRoute');

const app = express();
const PORT = process.env.APP_PORT || 8080;

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Additional Routes

app.get('/rest', (req,res) => {
  res.status(200).json({
    status: 'success',
    message: 'Routed Successfully',
  })
});

app.use('/api/v1/auth', authRouter);