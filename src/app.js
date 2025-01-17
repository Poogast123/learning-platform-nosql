// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

function configureExpress(app) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/api/courses', courseRoutes); 
  app.use('/api/students', studentRoutes); 
}

async function gracefulShutdown(signal) {
  console.log(`Received signal: ${signal}. Closing server...`);
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
}

async function startServer() {
  try {
    await mongoose.connect('mongodb://localhost:27017/yourdbname', {
      // useNewUrlParser and useUnifiedTopology are no longer needed
    });
    console.log('Connected to MongoDB!');

    configureExpress(app);

    const server = app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();