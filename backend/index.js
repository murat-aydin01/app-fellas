require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Reservation = require('./models/Reservation'); // Rezervasyon modeli
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware'ler
app.use(express.json());
app.use(cors()); // Frontend ile bağlantı için gerekli

// MongoDB bağlantısı (Atlas)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas bağlantısı başarılı'))
  .catch((err) => {
    console.error('MongoDB bağlantı hatası:', err);
    process.exit(1);
  });


// Uçuş rezervasyonu kaydetme (POST)
app.post('/api/reserve', async (req, res) => {
  try {
    const { flightId, userId, flightDate } = req.body;

    // Uçuş tarihini kontrol et (geçmiş bir tarih için rezervasyon yapılmasın)
    const currentDate = new Date();
    if (new Date(flightDate) < currentDate) {
      return res.status(400).json({ message: 'Geçmiş bir tarih için rezervasyon yapılamaz.' });
    }

    const reservation = new Reservation({ flightId, userId, flightDate });
    await reservation.save();
    res.status(201).json({ message: 'Uçuş başarıyla rezerve edildi!' });
  } catch (error) {
    res.status(500).json({ message: 'Bir hata oluştu', error });
  }
});

// Rezervasyonları listeleme (GET)
app.get('/api/flights', async (req, res) => {
  try {
    const currentDate = new Date();
    // Geçmişteki uçuşları hariç tut
    const reservations = await Reservation.find({ flightDate: { $gte: currentDate } });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Bir hata oluştu', error });
  }
});

// Schiphol Flight API üzerinden uçuş bilgilerini alma (proxy)
app.get('/api/flight-info', async (req, res) => {
  try {
    const response = await axios.get('https://api.schiphol.nl/public-flights/flights', {
      headers: {
        'app_id': process.env.SCHIPHOL_APP_ID,
        'app_key': process.env.SCHIPHOL_APP_KEY,
        'ResourceVersion': 'v4'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Schiphol API hatası', error });
  }
});

// Sunucuyu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
