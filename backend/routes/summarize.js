const express = require('express');
const router = express.Router();

// GET /api/summarize/:patientId/:pdfName
router.get('/:patientId/:pdfName', (req, res) => {
  const { patientId, pdfName } = req.params;

  // Faux résumé pour test
  const summary = `Résumé fictif pour le fichier "${pdfName}" du patient "${patientId}".`;

  res.json({ summary });
});

module.exports = router;
