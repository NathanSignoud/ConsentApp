const Patient = require('../models/Patient');

exports.createPatient = async (req, res) => {
  try {
    const { name, age, pathologies } = req.body;
    const pdfPaths = req.files.map(file => file.path);
    const patient = new Patient({
      name,
      age,
      pathologies: JSON.parse(pathologies),
      pdfs: pdfPaths,
    });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
