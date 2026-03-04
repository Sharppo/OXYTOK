const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// WAJIB: Agar browser tidak memblokir request (Anti-CORS Error)
app.use(cors());

// Test koneksi (Buka ini dulu di browser: https://link-lo/health)
app.get('/health', (req, res) => {
    res.json({ success: true, message: "OXYTOK Engine Online!" });
});

app.get('/api/analyze', async (req, res) => {
    const videoUrl = req.query.url;
    
    if (!videoUrl) {
        return res.status(400).json({ success: false, message: "Link kosong!" });
    }

    try {
        const response = await axios.get(videoUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });

        // Dummy Data (Gue kasih data ini dulu buat mastiin JSON lo jalan)
        // Kalau ini muncul di dashboard, berarti jalur kabel lo udah BENER!
        res.json({
            success: true,
            title: "OXYTOK System Berhasil Terhubung!",
            author: { uniqueId: "tiktok_user" },
            stats: { 
                likes: 12500, 
                views: 250000, 
                comments: 450, 
                shares: 89 
            }
        });

    } catch (err) {
        console.error("Error Backend:", err.message);
        res.status(500).json({ success: false, message: "Gagal ambil data TikTok (Server Busy)" });
    }
});

// SESUAI GAMBAR 3: Gunakan Port 8080 atau otomatis dari Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`[OXYTOK] Running on port ${PORT}`);
});
