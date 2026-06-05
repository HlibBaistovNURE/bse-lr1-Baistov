/* global process */
const express = require('express');
// Підключаємо твій клас (шлях згідно з твоєю структурою папок)
const RecommendationService = require('./tests/classes/recommendationService');

const app = express();
// Порт для локалки (3000) або той, який видасть хмара при деплої
const PORT = process.env.PORT || 3000;

const service = new RecommendationService();

app.use(express.json());

// 1. Обов'язковий endpoint для перевірки здоров'я сервера (Health Check)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running perfectly!' });
});

// 2. Основний endpoint для отримання факту
app.get('/api/fact', (req, res) => {
    try {
        // Якщо категорію не передали, за замовчуванням беремо 'business'
        const category = req.query.category || 'business'; 
        const fact = service.generateFact(category);
        res.status(200).json({ success: true, data: fact });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});