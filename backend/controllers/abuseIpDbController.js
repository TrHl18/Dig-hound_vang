const axios = require('axios');
const QueryLog = require('../models/QueryLog');

exports.checkIp = async (req, res) => {
    const { ip } = req.body;
    try {
        const response = await axios.get('https://api.abuseipdb.com/api/v2/check', {
            params: { ipAddress: ip },
            headers: { Key: process.env.ABUSEIPDB_APIKEY, Accept: 'application/json' }
        });
        await QueryLog.create({ service: 'AbuseIPDB', query: ip, result: response.data });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};