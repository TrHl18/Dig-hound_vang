const express = require('express');
const axios = require('axios');
const router = express.Router();
const UrlScan = require('../models/UrlScansModel'); // For history

// POST /api/scan-url (VirusTotal)
router.post('/scan-url', async (req, res) => {
  try {
    const { url } = req.body;
    console.log('[VirusTotal] URL recibida:', url);

    // 1. Envía la URL a VirusTotal
    const submit = await axios.post(
      'https://www.virustotal.com/api/v3/urls',
      `url=${encodeURIComponent(url)}`,
      {
        headers: {
          'x-apikey': process.env.VT_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    console.log('[VirusTotal] Respuesta al enviar URL:', submit.data);

    // 2. Codifica la URL original en base64url
    const urlId = Buffer.from(url).toString('base64url');
    console.log('[VirusTotal] urlId (base64url):', urlId);

    // 3. Haz polling hasta que el reporte esté listo
    let fullReport = null;
    for (let i = 0; i < 10; i++) {
      const reportResp = await axios.get(
        `https://www.virustotal.com/api/v3/urls/${urlId}`,
        { headers: { 'x-apikey': process.env.VT_API_KEY } }
      );
      fullReport = reportResp.data.data;
      console.log(`[VirusTotal] Intento ${i + 1} - last_analysis_stats:`, fullReport.last_analysis_stats);
      if (
        fullReport.last_analysis_stats &&
        typeof fullReport.last_analysis_stats.malicious === 'number'
      ) break;
      await new Promise(res => setTimeout(res, 3000));
    }

    // 4. Devuelve ese fullReport al frontend
    console.log('[VirusTotal] Reporte final enviado al frontend:', fullReport);
    res.json(fullReport);
  } catch (error) {
    console.error('VirusTotal scan error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to scan URL with VirusTotal' });
  }
});

// GET /api/url-history (unchanged)
router.get('/url-history', async (req, res) => {
  try {
    const history = await UrlScan.find().sort({ createdAt: -1 }).limit(20);
    res.json({ data: history });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
