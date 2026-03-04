const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Izin akses agar Frontend bisa ambil data
app.use(cors());

// Test apakah server jalan
app.get('/health', (req, res) => {
    res.json({ success: true, message: "OXYTOK System Online" });
});

app.get('/api/analyze', async (req, res) => {
    const videoUrl = req.query.url;
    
    if (!videoUrl) {
        return res.status(400).json({ success: false, message: "URL kosong!" });
    }

    try {
        const response = await axios.get(videoUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
            }
        });

        // Dummy data untuk tes koneksi pertama kali
        // Jika koneksi sukses, lo bakal dapet angka di bawah ini
        res.json({
            success: true,
            title: "Koneksi Berhasil! System OXYTOK Siap.",
            author: { uniqueId: "tiktok_user" },
            stats: { 
                likes: 8888, 
                views: 150000, 
                comments: 120, 
                shares: 45 
            }
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Gagal ambil data TikTok" });
    }
});

// Di file server.js paling bawah
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
