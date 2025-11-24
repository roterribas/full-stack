const express = require("express");
const app = express();
const port = 3000;

// Criar função
// Rota principal
app .get('/', (req, res) => {
    res.send('BEM VINDO AO SERVIDOR Node.js');
});

// Executando o servidor
app.listen(port, () => {
    console.log(`SERVIDOR RODANDO EM http://localhost:${port}`)
});