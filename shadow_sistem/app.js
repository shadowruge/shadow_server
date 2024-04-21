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
const postsFilePath = path.join(__dirname, 'data', 'post.json'); // Caminho para o novo arquivo JSON para os posts
const publicPath = path.join(__dirname, 'public');

// Verifica se o diretório para os arquivos JSON existe, se não, cria-o
fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas para os arquivos HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/cadastroclientes.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'cadastroclientes.html'));
});

app.get('/viewclientes.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'viewclientes.html'));
});

app.get('/cadastroprodutos.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'cadastroprodutos.html'));
});

app.get('/viewprodutos.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'viewprodutos.html'));
});

app.get('/cadastracobrancas.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'cadastracobrancas.html'));
});

app.get('/viewcobrancas.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'viewcobrancas.html'));
});

app.get('/agenda.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'agenda.html'));
});


app.get('/viewagenda.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'viewagenda.html'));
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
                id: cobrancas.length + 1,
                ...req.body
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
    console.log('Dados do formulário:', req.body);

    fs.readFile(clientesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON de clientes:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON de clientes');
        }

        try {
            const clientes = JSON.parse(data);
            const newClient = {
                id: clientes.length + 1,
                ...req.body
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

// Rota para visualizar o arquivo JSON de produtos
app.get('/data/produtos.json', (req, res) => {
    fs.readFile(produtosFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON de produtos:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON de produtos');
        }

        if (data.trim() === '') {
            data = '[]';
        }

        const produtos = JSON.parse(data);
        res.json(produtos);
    });
});

app.get('/data/post.json', (req, res) => {
    fs.readFile(postsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON de posts:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON de posts');
        }

        if (data.trim() === '') {
            data = '[]';
        }

        const posts = JSON.parse(data);
        res.json(posts);
    });
});


// Rota para adicionar um novo produto
app.post('/data/produtos.json', (req, res) => {
    console.log('Dados do formulário:', req.body);

    fs.readFile(produtosFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON de produtos:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON de produtos');
        }

        try {
            const produtos = JSON.parse(data);
            const newProduto = {
                id: produtos.length + 1,
                ...req.body
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

// Rota para adicionar um novo post
app.post('/data/post.json', (req, res) => {
    fs.readFile(postsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON de posts:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON de posts');
        }

        try {
            const posts = JSON.parse(data);
            const newPost = {
                id: posts.length + 1,
                title: req.body.title,
                content: req.body.content
            };

            posts.push(newPost);

            fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao salvar o arquivo JSON de posts:', err);
                    return res.status(500).send('Erro ao salvar o arquivo JSON de posts');
                }
                
                res.json(newPost);
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Erro ao analisar o JSON de posts');
        }
    });
});

// Função para enviar notificação
function scheduleNotification(date, message) {
    console.log(`Agendando notificação para ${date}: ${message}`);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zambelestar@gmail.com',
            pass: 'izaias1976'
        }
    });
    
    const mailOptions = {
        from: 'zambelestar@gmail.com',
        to: 'zambelestar@gmail.com',
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
scheduleNotification()
// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
