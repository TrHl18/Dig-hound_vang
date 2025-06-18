// Importo los módulos que necesito: Express, axios y el modelo para guardar el historial
const express = require('express');
const axios = require('axios');
const router = express.Router();
const UrlScan = require('../models/UrlScansModel'); 

// Ruta para escanear una URL con VirusTotal
router.post('/scan-url', async (req, res) => {
  try {
    const { url } = req.body;
    // 1. Aquí mando la URL a VirusTotal para que la analicen
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
    const urlId = submit.data.data.id; // Este es el ID codificado en base64url

    // 2. Ahora espero a que VirusTotal termine el análisis (intenta hasta 10 veces, cada 3 segundos)
    let fullReport = null;
    for (let i = 0; i < 10; i++) {
      const reportResp = await axios.get(
        `https://www.virustotal.com/api/v3/urls/${urlId}`,
        { headers: { 'x-apikey': process.env.VT_API_KEY } }
      );
      fullReport = reportResp.data.data;
      // Si ya tiene los stats, salgo del ciclo
      if (
        fullReport.last_analysis_stats &&
        typeof fullReport.last_analysis_stats.malicious === 'number'
      ) break;
      // Si no, espero 3 segundos y vuelvo a intentar
      await new Promise(res => setTimeout(res, 3000));
    }

    // 3. Guardo el resultado en la base de datos para el historial
    await UrlScan.create({
      url,
      uuid: urlId,
      data: fullReport,
      createdAt: new Date()
    });

    // 4. Devuelvo el resultado al frontend
    res.json(fullReport);
  } catch (error) {
    // Si algo sale mal, muestro el error en la consola y le aviso al usuario
    console.error('Error al escanear con VirusTotal:', error.response?.data || error.message);
    res.status(500).json({ error: 'No se pudo escanear la URL con VirusTotal' });
  }
});

// Ruta para traer el historial de escaneos
router.get('/url-history', async (req, res) => {
  try {
    const history = await UrlScan.find().sort({ createdAt: -1 }).limit(20);
    res.json({ data: history });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el historial' });
  }
});

module.exports = router;
