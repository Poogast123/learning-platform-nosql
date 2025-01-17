// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const { title, description, teacherId } = req.body;

    if (!title || !description || !teacherId) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires : title, description, teacherId' });
    }

    if (!ObjectId.isValid(teacherId)) {
      return res.status(400).json({ error: 'teacherId invalide' });
    }

    const course = {
      title,
      description,
      teacherId: new ObjectId(teacherId),
      createdAt: new Date()
    };

    const db = mongoService.getDb();
    const result = await db.collection('courses').insertOne(course);

    const redisClient = redisService.getRedisClient();
    const cacheKey = `course:${result.insertedId}`;
    await redisClient.set(cacheKey, JSON.stringify(course), { EX: 3600 }); 

    res.status(201).json({ message: 'Cours créé avec succès', courseId: result.insertedId });
  } catch (error) {
    console.error('Erreur lors de la création du cours:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

async function getCourse(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID de cours invalide' });
    }

    const db = mongoService.getDb();
    const course = await db.collection('courses').findOne({ _id: new ObjectId(id) });

    if (!course) {
      return res.status(404).json({ error: 'Cours non trouvé' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Erreur lors de la récupération du cours:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

async function getCourseStats(req, res) {
  try {
    const db = mongoService.getDb();
    const stats = await db.collection('courses').aggregate([
      {
        $group: {
          _id: null,
          totalCourses: { $sum: 1 },
          averageStudents: { $avg: '$studentsCount' }
        }
      }
    ]).toArray();

    res.status(200).json(stats[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques des cours:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  getCourse,
  getCourseStats
};