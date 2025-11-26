const express = require("express");
const app = express();
const PORT = 3000; // executar na porta 3000

// mock
const nomes = [
  { id: 1, nome: "Fernanda", idade: "18" },
  { id: 2, nome: "Caio", idade: "23" },
  { id: 3, nome: "Pedro", idade: "56" },
  { id: 4, nome: "Samuel", idade: "45" },
  { id: 5, nome: "Doris", idade: "33" },
];

// Criando fucnçoes auxiliares
// Retorna o objeto por ID
function buscarNomeId(id) {
  return nomes.filter((nomes) => nomes.id == id);
}

app.listen(PORT, () => {
  console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
});

app.get("/teste", (req, res) => {
  res.send("API nodePeople está funcionando!");
});

app.get("/listaNomes", (req, res) => {
  res.send(nomes);
});

app.get("/listaNomes/:id", (req, res) => {
  let index = req.params.id;

  res.json(buscarNomeId(index));
});

app.get("/", (req, res) => {
  res.send("Conectado ao servidor🖥️")
});