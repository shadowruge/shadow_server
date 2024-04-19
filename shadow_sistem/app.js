const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const clientesFilePath = path.join(__dirname, 'data', 'clientes.json');

// Middleware para analisar o corpo da solicitação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para servir o arquivo index.html na pasta public
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cadastroclientes.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastroclientes.html'));
});

app.get('/viewclientes.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewclientes.html'));
});

app.get('/cadastroprodutos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastroprodutos.html'));
});

app.get('/viewprodutos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewprodutos.html'));
});


// Rota para visualizar o arquivo JSON de clientes
app.get('/data/clientes.json', (req, res) => {
    fs.readFile(clientesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON de clientes:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON de clientes');
        }
        res.json(JSON.parse(data));
    });
});

// Rota para adicionar um novo cliente
app.post('/data/clientes.json', (req, res) => {
    // Verifique o conteúdo de req.body para garantir que os dados do formulário estejam sendo recebidos corretamente
    console.log('Dados do formulário:', req.body);

    fs.readFile(clientesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON de clientes:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON de clientes');
        }

        try {
            const clientes = JSON.parse(data);
            const newClient = {
                id: clientes.length + 1, // Gerando um novo ID para o cliente
                ...req.body // Adicionando os dados do formulário ao novo cliente
            };

            clientes.push(newClient);

            fs.writeFile(clientesFilePath, JSON.stringify(clientes, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao salvar o arquivo JSON de clientes:', err);
                    return res.status(500).send('Erro ao salvar o arquivo JSON de clientes');
                }
                
                res.json(newClient);
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Erro ao analisar o JSON de clientes');
        }
    });
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
