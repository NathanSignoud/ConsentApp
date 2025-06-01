const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose')

// Configuration de Multer pour gérer les fichiers PDF
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({ storage: storage });

// GET /api/patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET /api/patients/:id
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/patients/:patientId/pdf/:pdfId
router.get('/:patientId/pdf/:pdfId', async (req, res) => {
  const patient = await Patient.findById(req.params.patientId);
  const pdf = patient.pdfs.id(req.params.pdfId);

  if (!pdf) return res.status(404).json({ message: 'PDF not found' });

  res.json(pdf); // ou res.sendFile(...) si tu veux envoyer le contenu
});

// POST /api/patients
router.post('/', upload.array('pdfs'), async (req, res) => {
  try {
    const { name, age } = req.body;
    const pathologies = JSON.parse(req.body.pathologies || '[]');

    const pdfs = req.files.map(file => ({
      _id: new mongoose.Types.ObjectId(),
      filename: file.originalname,
      path: file.filename
    }));

    const patient = new Patient({
      name,
      age,
      pathologies,
      pdfs
    });

    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    console.error('Erreur lors de la création du patient :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// DELETE /api/patients/:id
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    // Supprimer les fichiers PDF du disque
    if (patient.pdfs && patient.pdfs.length > 0) {
      patient.pdfs.forEach((filePath) => {
        fs.unlink(path.join(__dirname, '..', filePath), (err) => {
          if (err) {
            console.warn(`Fichier non supprimé : ${filePath}`, err);
          } else {
            console.log(`Fichier supprimé : ${filePath}`);
          }
        });
      });
    }
    res.status(200).json({ message: 'Patient and PDFs deleted successfully' });
  } catch (err) {
    console.error('DELETE error:', err);
    res.status(500).json({ message: 'Error deleting patient' });
  }
});


module.exports = router;