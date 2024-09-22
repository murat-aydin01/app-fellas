const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json());

// Basit bir route (test amaçlı)
app.get('/', (req, res) => {
  res.send('Backend çalışıyor!');
});

// Sunucuyu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend http://localhost:${PORT} adresinde çalışıyor`);
});
