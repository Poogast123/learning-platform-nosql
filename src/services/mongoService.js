// Question: Pourquoi créer des services séparés ?
// Réponse: 

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  if (!ObjectId.isValid(id)) {
    throw new Error(`ID invalide : ${id}`);
  }

  try {
    const objectId = new ObjectId(id);
    const document = await collection.findOne({ _id: objectId });

    if (!document) {
      throw new Error(`Aucun document trouvé avec l'ID : ${id}`);
    }

    return document;
  } catch (error) {
    console.error(`Erreur lors de la recherche par ID (${id}) :`, error);
    throw error; // Relance l'erreur pour gestion en amont
  }
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById
};