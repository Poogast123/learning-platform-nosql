// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    await mongoose.connect('mongodb://localhost:27017/crud', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB!');
    // TODO: Configurer les middlewares Express
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    // TODO: Monter les routes
    app.use('/users', userRoutes);
    app.use('/products', productRoutes); 
    // TODO: Démarrer le serveur
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }


// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  gracefulShutdown('SIGTERM')
});

}

startServer();