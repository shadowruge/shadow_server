const express = require('express');
const path = require('path');

const app = express();

// Configurando o diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, '../views')));

// Rota para os arquivos JSON
app.get('/clientes', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'data', 'clientes', 'clientes.json'));
});

app.get('/produtos', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'data', 'produtos', 'produtos.json'));
});

app.get('/cobrancas', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'data', 'cobrancas', 'cobrancas.json'));
});

// Rota para servir a página clientes.html
app.get('/clientes.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'home', 'clientes.html'));
});

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'home', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
