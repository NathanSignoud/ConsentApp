const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  pathologies: [String],
  pdfs: [String], // chemins des fichiers PDF
});

module.exports = mongoose.model('Patient', patientSchema);
