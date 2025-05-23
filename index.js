const sequelize = require('./config/database');
require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');
const path = require('path');

const authRouter = require('./route/authRoute');
const projectRouter = require('./route/projectRoute');
const userRouter = require('./route/userRoute');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const appRouter = require('./route/appRoute')

const app = express();

app.use(express.json());


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/app', appRouter);


app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 8080;

app.listen(PORT, () => {
    console.log('Server up and running', PORT);
});

const staticPath = path.join(__dirname, 'scam-scam/dist');
console.log(`Serving static files from: ${staticPath}`);

app.use(express.static(staticPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));
app.get(/.*/, (req, res) => {
  console.log('Fallback route hit for:', req.url);
  res.sendFile(path.join(staticPath, 'index.html'));
});

/*sequelize.sync({ force: true }).then(() => {
  console.log('Database synced (force: true) — all tables dropped and recreated.');
});*/



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


