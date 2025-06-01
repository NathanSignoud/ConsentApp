const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  pathologies: [String],
  pdfs: [
  {
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    filename: String,
    path: String
  }
]
});

module.exports = mongoose.model('Patient', patientSchema);
