const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const TOKEN = '8889941946:AAHO6vCymn948_bAQU93ZoEntBbH7GIXUWg';
const ADMIN_CHAT_ID = '6675473048';

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();
app.use(express.json());
app.use(cors());

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name || 'ተጫዋች';
    
    bot.sendMessage(chatId, `ሰላም ${userName}! እንኳን ወደ Haylat Bingo በደህና መጡ። ጨዋታውን ለመጀመር ከታች ያለውን ቁልፍ ይጫኑ!`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "🎮 Bingo ለመጫወት (Open Game)", web_app: { url: "https://haylat-bingo-bot.onrender.com" } }]
            ]
        }
    });
});

app.post('/api/deposit', (msgData) => {
    // Payment processing endpoint
    const { userId, amount, phone } = msgData.body;
    bot.sendMessage(ADMIN_CHAT_ID, `🔔 አዲስ የငွေ ማስተላለፍ ጥያቄ!\n\n👤 የተጠቃሚ ID: ${userId}\n💰 መጠን: ${amount} ብር\n📱 ስልክ: ${phone}`);
    // Respond back
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
