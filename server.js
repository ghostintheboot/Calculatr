const dotenv = require('dotenv');
  dotenv.config({ path: './config.env' });
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

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('👑Royal Server👑 at Port', PORT);
});

process.on('unhandledRejection', (err, promise) => {
  console.log('Logged Error: ', err);
  server.close( () => process.exit(1));
});