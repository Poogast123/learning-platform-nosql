const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Routes pour les étudiants
router.post('/', studentController.createStudent);
router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudent);

module.exports = router;