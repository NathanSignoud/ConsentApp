const express = require('express');
const router = express.Router();
const multer = require('multer');
const patientController = require('../controllers/patientController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/', upload.array('pdfs'), patientController.createPatient);
router.get('/', patientController.getAllPatients);

module.exports = router;
