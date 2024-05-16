const express = require('express');
const path = require('path');
const app = express();

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Permitir que o Express analise o corpo da solicitação como JSON

app.listen(5000, () => {
    console.log("Server is active on port 5000");
});

// Endpoint para processamento do chat
app.post('/chat', async (req, res) => {
    try {
        const resp = await express.chat.completions.create({
            model: "bot_easy",
            messages: [
                { role: "user", content: req.body.question }
            ]
        });

        res.status(200).json({ message: resp.choices[0].message.content });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// Endpoint para servir a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
