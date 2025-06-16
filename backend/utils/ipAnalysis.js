const axios = require('axios');

const ABUSEIPDB_API_KEY = process.env.ABUSEIPDB_API_KEY;

// Geolocalización y datos de red (ip-api.com)
async function getIPGeo(ip) {
  const url = `http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,isp,org,as,query`;
  const { data } = await axios.get(url);
  if (data.status !== "success") throw new Error(data.message || "IP info lookup failed");
  return {
    ipAddress: data.query,
    country: data.country,
    region: data.regionName,
    city: data.city,
    isp: data.isp,
    organization: data.org,
    as: data.as
  };
}

// Reputación y reportes (AbuseIPDB)
async function getIPReports(ip) {
  const url = `https://api.abuseipdb.com/api/v2/check`;
  const { data } = await axios.get(url, {
    params: { ipAddress: ip, maxAgeInDays: 90 },
    headers: {
      Key: ABUSEIPDB_API_KEY,
      Accept: 'application/json'
    }
  });
  return {
    abuseConfidenceScore: data.data.abuseConfidenceScore,
    totalReports: data.data.totalReports,
    countryCode: data.data.countryCode,
    usageType: data.data.usageType,
    isp: data.data.isp,
    domain: data.data.domain,
    hostnames: data.data.hostnames,
    lastReportedAt: data.data.lastReportedAt,
  };
}

// Función combinada
async function analyzeIP(ip) {
  const [geo, abuse] = await Promise.all([
    getIPGeo(ip),
    getIPReports(ip)
  ]);
  // Merge datos (prioriza los de AbuseIPDB si hay duplicados)
  return { ...geo, ...abuse, ipAddress: ip };
}

module.exports = analyzeIP;