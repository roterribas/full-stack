const express = require("express");
const app = express();
const port = 3000;

// Variavel com os dados do produtos
const produtos = [
    {id: 1, nome: `Produto A`, preco: 100},
    {id: 2, nome: `Produto B`, preco: 150},
    {id: 3, nome: `Produto C`, preco: 200},
];

// Criar função
// Rota principal
app.get('/', (req, res) => {
    res.send('BEM VINDO AO SERVIDOR Node.js');
});

// Rota produtos
app.get('/produtos', (req, res) => {
    res.send(produtos);
});

// Rota home
app.get('/home', (req, res) => {
    // console.log("ola: ", __dirname);
    res.sendFile(__dirname + '/public/home.html')
});

// Executando o servidor
app.listen(port, () => {
    console.log(`SERVIDOR RODANDO EM http://localhost:${port}`)
});