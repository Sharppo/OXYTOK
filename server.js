const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Izin akses agar browser tidak memblokir (Anti-CORS)
app.use(cors());

// Tambahkan rute dasar (/) agar Railway tidak bingung
app.get('/', (req, res) => {
    res.send("OXYTOK Backend is Running! Access /api/analyze for data.");
});

// Rute kesehatan untuk tes awal
app.get('/health', (req, res) => {
    res.json({ success: true, message: "OXYTOK Engine Online!" });
});

// Rute inti untuk ambil data TikTok
app.get('/api/analyze', async (req, res) => {
    const videoUrl = req.query.url;
    
    if (!videoUrl) {
        return res.status(400).json({ success: false, message: "URL kosong!" });
    }

    try {
        // Headers agar tidak dianggap bot
        const response = await axios.get(videoUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        // Kirim data dummy dulu untuk tes jalur
        res.json({
            success: true,
            title: "OXYTOK System Online & Connected!",
            author: { uniqueId: "tiktok_user" },
            stats: { likes: 12500, views: 250000, comments: 450, shares: 89 }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server busy, coba lagi nanti." });
    }
});

// Railway akan mengisi PORT secara otomatis ke 8080 sesuai gambar lo
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server jalan di port ${PORT}`);
});
