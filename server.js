const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Rute tes biar kita tau server hidup
app.get('/health', (req, res) => {
    res.json({ success: true, message: "OXYTOK Engine Online!" });
});

// Rute utama yang dipanggil Frontend
app.get('/api/analyze', (req, res) => {
    const videoUrl = req.query.url;
    
    // Kirim data dummy dulu biar kita tau kodenya nyambung
    res.json({
        success: true,
        title: "Koneksi Berhasil!",
        author: { uniqueId: "user_test" },
        stats: { likes: 5000, views: 10000, comments: 100, shares: 10 }
    });
});

// Sesuaikan dengan Port Railway (8080)
const PORT = process.env.PORT || 3000; 

app.listen(PORT, '0.0.0.0', () => {
    console.log(`[OXYTOK] Mesin menyala di port: ${PORT}`);
});

