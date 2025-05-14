const express = require('express');
const router = require('./routes/router');
const { testConnection } = require('./config/db');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }
    next();
});

app.use('/api/auth', router);

app.use((req, res) => {
    res.status(404).json({ message: 'Không tìm thấy tài nguyên' });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        const dbConnected = await testConnection();

        if (dbConnected) {
            app.listen(PORT, () => {
                console.log(`Server đang chạy tại http://localhost:${PORT}`);
            });
        } else {
            console.error('Không thể khởi động server do lỗi kết nối database');
            process.exit(1);
        }
    } catch (error) {
        console.error('Lỗi khởi động server:', error);
        process.exit(1);
    }
};

startServer();