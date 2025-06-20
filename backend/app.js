require('dotenv').config();
const express = require('express');
const  db  = require('./config/db');
const authRouter = require('./routes/auth');
const ipCheckRouter = require('./routes/ipCheck');
const urlScansRouter = require('./routes/urlScans');
const cors = require('cors');
const dns = require('dns').promises;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', ipCheckRouter);
app.use('/api/auth', authRouter);
app.use('/api', urlScansRouter);

db()

app.get('/api/resolve/:domain', async (req, res) => {
  try {
    const addresses = await dns.resolve4(req.params.domain);
    res.json({ ips: addresses });
  } catch (err) {
    res.status(400).json({ error: 'Could not resolve domain', details: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

