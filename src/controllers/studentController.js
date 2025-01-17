const { ObjectId } = require('mongodb');
const mongoService = require('../services/mongoService');

async function createStudent(req, res) {
  try {
    const { name, age, courseId } = req.body;

    if (!name || !age || !courseId) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires : name, age, courseId' });
    }

    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: 'courseId invalide' });
    }

    const student = {
      name,
      age,
      courseId: new ObjectId(courseId),
      createdAt: new Date()
    };

    const db = mongoService.getDb();
    const result = await db.collection('students').insertOne(student);

    res.status(201).json({ message: 'Étudiant créé avec succès', studentId: result.insertedId });
  } catch (error) {
    console.error('Erreur lors de la création de l\'étudiant:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

async function getStudents(req, res) {
  try {
    const db = mongoService.getDb();
    const students = await db.collection('students').find().toArray();
    res.status(200).json(students);
  } catch (error) {
    console.error('Erreur lors de la récupération des étudiants:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

async function getStudent(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID d\'étudiant invalide' });
    }

    const db = mongoService.getDb();
    const student = await db.collection('students').findOne({ _id: new ObjectId(id) });

    if (!student) {
      return res.status(404).json({ error: 'Étudiant non trouvé' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'étudiant:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

module.exports = {
  createStudent,
  getStudents,
  getStudent
};