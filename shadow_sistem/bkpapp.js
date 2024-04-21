const express = require('express');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const clientesFilePath = path.join(__dirname, 'data', 'clientes.json');
const produtosFilePath = path.join(__dirname, 'data', 'produtos.json');
const cobrancasFilePath = path.join(__dirname, 'data', 'cobrancas.json');
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



// Rota para servir a página de cadastro de cobranças
app.get('/cadastracobrancas.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastracobrancas.html'));
});

// Rota para servir a página de visualização de cobranças
app.get('/viewcobrancas.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewcobrancas.html'));
});

app.get('/agenda.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'agenda.html'));
});

// Rota para visualizar o arquivo JSON de cobranças
app.get('/data/cobrancas.json', (req, res) => {
    fs.readFile(cobrancasFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON de cobranças:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON de cobranças');
        }
        res.json(JSON.parse(data));
    });
});

// Rota para adicionar uma nova cobrança
app.post('/data/cobrancas.json', (req, res) => {
    fs.readFile(cobrancasFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON de cobranças:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON de cobranças');
        }

        try {
            const cobrancas = JSON.parse(data);
            const newCobranca = {
                id: cobrancas.length + 1, // Gerando um novo ID para a cobrança
                ...req.body // Adicionando os dados do formulário à nova cobrança
            };

            cobrancas.push(newCobranca);

            fs.writeFile(cobrancasFilePath, JSON.stringify(cobrancas, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao salvar o arquivo JSON de cobranças:', err);
                    return res.status(500).send('Erro ao salvar o arquivo JSON de cobranças');
                }
                
                res.json(newCobranca);
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Erro ao analisar o JSON de cobranças');
        }
    });
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

//Area para produtos
// Rota para visualizar o arquivo JSON de produtos
app.get('/data/produtos.json', (req, res) => {
    fs.readFile(produtosFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON de produtos:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON de produtos');
        }

        // Verifica se o arquivo está vazio
        if (data.trim() === '') {
            // Inicializa o arquivo com um array vazio
            data = '[]';
        }

        // Parseia o JSON
        const produtos = JSON.parse(data);
        res.json(produtos);
    });
});


// Rota para adicionar um novo produto
app.post('/data/produtos.json', (req, res) => {
    // Verifique o conteúdo de req.body para garantir que os dados do formulário estejam sendo recebidos corretamente
    console.log('Dados do formulário:', req.body);

    fs.readFile(produtosFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON de produtos:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON de produtos');
        }

        try {
            const produtos = JSON.parse(data);
            const newProduto = {
                id: produtos.length + 1, // Gerando um novo ID para o produto
                ...req.body // Adicionando os dados do formulário ao novo produto
            };

            produtos.push(newProduto);

            fs.writeFile(produtosFilePath, JSON.stringify(produtos, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao salvar o arquivo JSON de produtos:', err);
                    return res.status(500).send('Erro ao salvar o arquivo JSON de produtos');
                }
                
                res.json(newProduto);
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Erro ao analisar o JSON de produtos');
        }
    });
});


// Função para agendar um post
function schedulePost(platform, content, date) {
    console.log(`Agendando post para ${platform} em ${date}: ${content}`);
    // Lógica para agendar o post na plataforma desejada
}

// Função para enviar notificação
function scheduleNotification(date, message) {
    console.log(`Agendando notificação para ${date}: ${message}`);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'seuemail@gmail.com',
            pass: 'suasenha'
        }
    });
    
    const mailOptions = {
        from: 'seuemail@gmail.com',
        to: 'seuemail@gmail.com',
        subject: 'Lembrete de Postagem',
        text: message
    };
    
    const job = schedule.scheduleJob(date, function(){
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    });
}

// Exemplo de uso
schedulePost('Instagram', 'Conteúdo do post no Instagram', new Date('2024-04-20 12:00:00'));
schedulePost('Facebook', 'Conteúdo do post no Facebook', new Date('2024-04-21 10:00:00'));

scheduleNotification(new Date('2024-04-20 11:00:00'), 'Lembre-se de fazer o post no Instagram hoje!');




// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
