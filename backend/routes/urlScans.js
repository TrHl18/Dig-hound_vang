const express = require('express');
const axios = require('axios');
const router = express.Router();
const UrlScan = require('../models/UrlScansModel'); // For history

// POST /api/scan-url (VirusTotal)
router.post('/scan-url', async (req, res) => {
  try {
    const { url } = req.body;
    // 1. Submit URL to VirusTotal
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
    const scanId = submit.data.data.id;

    // 2. Poll for analysis result (up to 10 times, 3s apart)
    let result = null;
    for (let i = 0; i < 10; i++) {
      const poll = await axios.get(
        `https://www.virustotal.com/api/v3/analyses/${scanId}`,
        { headers: { 'x-apikey': process.env.VT_API_KEY } }
      );
      result = poll.data.data;
      if (result.attributes.status === 'completed') break;
      await new Promise(res => setTimeout(res, 3000));
    }

    if (!result || result.attributes.status !== 'completed') {
      return res.status(202).json({ error: 'Scan is still processing. Please try again.' });
    }

    // 3. Save to history
    await UrlScan.create({
      url,
      uuid: scanId,
      data: result,
      createdAt: new Date()
    });

    res.json(result);
  } catch (error) {
    console.error('VirusTotal scan error:', error.message);
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
