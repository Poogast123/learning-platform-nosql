// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
    // TODO: Implémenter une fonction générique de cache
    try {
      const redisClient = redisService.getRedisClient();
  
      // Convertir les données en chaîne JSON
      const jsonData = JSON.stringify(data);
  
      // Stocker les données avec une durée de vie (TTL)
      await redisClient.set(key, jsonData, { EX: ttl });
  
      console.log(`Données mises en cache sous la clé : ${key}`);
    } catch (error) {
      console.error(`Erreur lors de la mise en cache des données (${key}):`, error);
      throw error; // Relancer l'erreur pour gestion en amont
    }
  }
  
  // Fonction générique pour récupérer des données en cache
  async function getCachedData(key) {
    try {
      const redisClient = redisService.getRedisClient();
  
      // Récupérer les données de Redis
      const jsonData = await redisClient.get(key);
  
      if (!jsonData) {
        console.log(`Aucune donnée trouvée dans le cache pour la clé : ${key}`);
        return null;
      }
  
      // Convertir la chaîne JSON en objet
      return JSON.parse(jsonData);
    } catch (error) {
      console.error(`Erreur lors de la récupération des données du cache (${key}):`, error);
      throw error;
    }
  }
  
  // Fonction générique pour supprimer des données en cache
  async function deleteCache(key) {
    try {
      const redisClient = redisService.getRedisClient();
  
      // Supprimer la clé du cache
      const result = await redisClient.del(key);
  
      if (result) {
        console.log(`Données supprimées du cache pour la clé : ${key}`);
      } else {
        console.log(`Aucune donnée trouvée à supprimer pour la clé : ${key}`);
      }
    } catch (error) {
      console.error(`Erreur lors de la suppression des données du cache (${key}):`, error);
      throw error;
    }
  }
  
  module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData,
    getCachedData,
    deleteCache
  };