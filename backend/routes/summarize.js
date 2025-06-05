const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/summarize/:patientId/:pdfName
router.get('/:patientId/:pdfName', async (req, res) => {
  const { patientId, pdfName } = req.params;

  try {
    // Appel à l'API Flask
    const response = await axios.get('http://localhost:5001/summarize', {
      params: {
        patientId,
        pdfName
      }
    });

    // Renvoie le résumé obtenu depuis Flask
    res.json({ summary: response.data.summary });
  } catch (error) {
    console.error('Erreur avec l’API Flask :', error.message);
    res.status(500).json({
      error: 'Impossible de générer un résumé. Le service Flask est-il démarré ?'
    });
  }
});

module.exports = router;
