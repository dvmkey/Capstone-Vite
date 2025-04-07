require('dotenv').config({path: `${process.cwd()}/.env`});

const express = require('express');
const authRouter = require('./route/authRoute');
const projectRouter = require('./route/projectRoute');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');

const app = express();
const PORT = process.env.APP_PORT || 8080;

app.use(express.json());



// Additional Routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', projectRouter);

app.use('{/*path}', (req,res,next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found.',
  });
});

app.use('*', catchAsync(async (req, res, next) => {
  throw new AppError('this is error', 404);
}));

app.use(globalErrorHandler);


app.use((err, req, res, next) => {
  res.status(404).json({
    status:'fail',
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Uncomment everything between this and "catch all" if you want things to work
//const staticPath = path.join(__dirname, 'scam-scam/dist');
//console.log(`Serving static files from: ${staticPath}`); // Add this line

/*
app.use(express.static(staticPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));
*/

// Catch-all route to serve index.html for React Router

/* 

Uncommenting the following code block will get the program to run just like it did before.
However, the urls for this project need to be reworked.  The way it does page handling now
prevents me from doing on server testing. 

I could probably figure out how to make it work but that's beyond the scope of what I am
responsible for at the moment and I really only care about getting the api's to work.

*/

/*
app.get('{/*path}', (req, res) => {
  const indexPath = path.join(__dirname, 'scam-scam/dist/index.html');
  console.log(`Serving index.html from: ${indexPath}`); // add this line.
  res.sendFile(indexPath);
});
*/


