// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : 
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : 

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  try {
    mongoClient = new MongoClient(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);

    console.log('Connexion à MongoDB réussie');
    return db; // Retourne l'instance de la base de données
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB :', error);
    throw error; // Relance l'erreur pour gestion en amont
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  return new Promise((resolve, reject) => {
    redisClient = redis.createClient({
      url: config.redis.uri
    });

    redisClient.on('error', (err) => {
      console.error('Erreur lors de la connexion à Redis :', err);
      reject(err);
    });

    redisClient.on('connect', () => {
      console.log('Connexion à Redis réussie');
      resolve(redisClient); // Résout avec le client Redis
    });

    redisClient.connect().catch((err) => {
      console.error('Échec initial de la connexion Redis :', err);
      reject(err);
    });
  });
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  getDb: () => db, 
  getMongoClient: () => mongoClient, 
  getRedisClient: () => redisClient 
};