const dotenv = require('dotenv');
  dotenv.config({ path: './config.env' });
const path = require('path');
const express = require('express');
  const app = express();
const connectDB = require('./config/db.js');
const errorHandler = require('./middlewares/error.js');



// Connect to DB.
connectDB();

app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/private', require('./routes/privateRoutes'));

// Error Handlers (Should be LAST of midwares.)
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  // Build.
  app.use(express.static(path.join(__dirname, '/client/build')));

  // Whenever there's a get route, serve index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client','build', 'index.html'))
  });
} else {
  app.get('/', (req, res) => {
    res.send('API running. . .')
  });
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('👑Royal Server👑 at Port', PORT);
});

process.on('unhandledRejection', (err, promise) => {
  console.log('Logged Error: ', err);
  server.close( () => process.exit(1));
});