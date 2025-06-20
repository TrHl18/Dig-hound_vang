const express = require('express');
const IpLookup = require('../models/IpLookup');
const router = express.Router();
const analyzeIP = require('../utils/ipAnalysis');
const dns = require('dns').promises;
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token provided' });

  const token = auth.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Invalid token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

router.post('/resolve-domain', async (req, res) => {
  const { domain } = req.body;
  try {
    const addresses = await dns.resolve4(domain);
    res.json({ ips: addresses });
  } catch {
    res.status(400).json({ error: 'Unable to resolve domain' });
  }
});

router.post('/check-ip', requireAuth, async (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).json({ error: 'IP is required' });

  let lookup = await IpLookup.findOne({ ip, userId: req.userId });
  if (lookup) {
    return res.json({
      data: { ...lookup.geo, ...lookup.abuse, ipAddress: ip, cached: true }
    });
  }

  try {
    const data = await analyzeIP(ip);
    await IpLookup.create({
      ip,
      userId: req.userId,
      geo: {
        country: data.country,
        region: data.region,
        city: data.city,
        isp: data.isp,
        organization: data.organization,
        as: data.as,
      },
      abuse: {
        abuseConfidenceScore: data.abuseConfidenceScore,
        totalReports: data.totalReports,
        countryCode: data.countryCode,
        usageType: data.usageType,
        domain: data.domain,
        hostnames: data.hostnames,
        lastReportedAt: data.lastReportedAt,
      }
    });
    res.json({ data: { ...data, ipAddress: ip, cached: false } });
  } catch (err) {
    res.status(400).json({ error: 'Error analyzing IP', details: err.message });
  }
});

router.get('/history', requireAuth, async (req, res) => {
  const history = await IpLookup.find({ userId: req.userId })
    .sort({ createdAt: -1 })
    .limit(20);
  res.json({ history });
});

router.delete('/history/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await IpLookup.findOneAndDelete({ _id: id, userId: req.userId });
    if (!deleted) return res.status(404).json({ error: 'Registro no encontrado o no autorizado' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo borrar el registro' });
  }
});

module.exports = router;
