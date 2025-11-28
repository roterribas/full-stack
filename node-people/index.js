// =====================
// IMPORTAÇÕES E CONFIGURAÇÃO
// =====================

// Importa o módulo Express, necessário para criar o servidor
const express = require("express"); // require importa o módulo "express"

// Cria a instância da aplicação Express
const app = express(); // app será usado para configurar rotas e middlewares

// Define a porta do servidor
const PORT = 3000; // porta 3000, variável inteira

// Middleware para interpretar JSON nas requisições
app.use(express.json()); // express.json() retorna função middleware

// =====================
// MOCK DE DADOS
// =====================

// Array de objetos representando pessoas
const nomes = [ // abre array nomes
  { id: 1, nome: "Fernanda", idade: "18" }, // objeto 1 com id, nome e idade
  { id: 2, nome: "Caio", idade: "23" }, // objeto 2
  { id: 3, nome: "Pedro", idade: "56" }, // objeto 3
  { id: 4, nome: "Samuel", idade: "45" }, // objeto 4
  { id: 5, nome: "Doris", idade: "33" }, // objeto 5
]; // fecha array nomes

// Array de objetos representando times
const times = [ // abre array times
  { id: 1, nome: "Corinthians", estado: "SP", titulos: 7 }, // objeto 1
  { id: 2, nome: "Palmeiras", estado: "SP", titulos: 11 }, // objeto 2
  { id: 3, nome: "Santos", estado: "SP", titulos: 8 }, // objeto 3
  { id: 4, nome: "Flamengo", estado: "RJ", titulos: 7 }, // objeto 4
  { id: 5, nome: "Vasco", estado: "RJ", titulos: 4 }, // objeto 5
  { id: 6, nome: "Atlético Mineiro", estado: "MG", titulos: 3 }, // objeto 6
  { id: 7, nome: "Cruzeiro", estado: "MG", titulos: 4 }, // objeto 7
]; // fecha array times

// =====================
// FUNÇÕES AUXILIARES
// =====================

// Função para buscar nome por id
function buscarNomeId(id) { // abre função buscarNomeId com parâmetro id
  return nomes.filter((nome) => nome.id == id); // filter percorre nomes e retorna array com objetos que têm id igual ao parâmetro
} // fecha função buscarNomeId

// Função para buscar time por id
function buscarTimeId(id) { // abre função buscarTimeId
  return times.filter((time) => time.id == id); // filter percorre times e retorna array com objetos que têm id igual ao parâmetro
} // fecha função buscarTimeId

// Função para buscar índice de um nome pelo id
function buscarIdNomes(id) { // abre função buscarIdNomes
  return nomes.findIndex((nome) => nome.id == id); // findIndex retorna índice do primeiro elemento que satisfaz a condição
} // fecha função buscarIdNomes

// Função para buscar índice de um time pelo id
function buscarIdTimes(id) { // abre função buscarIdTimes
  return times.findIndex((time) => time.id == id); // findIndex retorna índice do primeiro elemento que satisfaz a condição
} // fecha função buscarIdTimes

// =====================
// INICIANDO SERVIDOR
// =====================

// Inicia o servidor e define porta
app.listen(PORT, () => { // abre listen com callback
  console.log(`Servidor rodando no endereço http://localhost:${PORT}`); // exibe mensagem no console
}); // fecha listen

// =====================
// ROTAS DE TESTE
// =====================

// Rota raiz GET
app.get("/", (req, res) => { // abre rota GET "/"
  res.send("Conectado ao servidor! 🖥"); // envia mensagem ao cliente
}); // fecha rota GET "/"

// Rota teste GET
app.get("/teste", (req, res) => { // abre rota GET "/teste"
  res.send("API nodePeople está funcionando!"); // envia mensagem ao cliente
}); // fecha rota GET "/teste"

// =====================
// ROTAS DE NOMES
// =====================

// GET: lista todos os nomes
app.get("/listaNomes", (req, res) => { // abre rota GET "/listaNomes"
  res.send(nomes); // envia array nomes completo
}); // fecha rota GET "/listaNomes"

// GET: retorna nome por ID
app.get("/listaNomes/:id", (req, res) => { // abre rota GET "/listaNomes/:id"
  const resultado = buscarNomeId(req.params.id)[0]; // busca array pelo id e pega primeiro elemento
  if (!resultado) { // verifica se resultado é undefined
    return res.send(`Nome com id ${req.params.id} não encontrado.`); // envia mensagem de erro
  }
  res.json(resultado); // envia objeto como JSON
}); // fecha rota GET "/listaNomes/:id"

// POST: adiciona nova pessoa
app.post("/listaNomes", (req, res) => { // abre rota POST "/listaNomes"
  const { id, nome, idade } = req.body; // desestrutura req.body para pegar id, nome e idade
  if (!id || !nome || !idade) { // verifica se algum campo está faltando
    return res.send("Dados inválidos. Informe id, nome e idade."); // envia mensagem de erro
  }
  nomes.push({ id, nome, idade }); // adiciona objeto no final do array
  res.send('Nome cadastrado com sucesso!'); // envia mensagem de sucesso
}); // fecha rota POST "/listaNomes"

// DELETE: remove pessoa pelo ID
app.delete("/listaNomes/:id", (req, res) => { // abre rota DELETE "/listaNomes/:id"
  const index = buscarIdNomes(req.params.id); // busca índice do id no array
  if (index === -1) { // verifica se índice não existe
    return res.send(`Não foi possível excluir: nome com id ${req.params.id} não existe.`); // envia mensagem de erro
  }
  nomes.splice(index, 1); // remove elemento do array usando splice
  res.send(`Nome com id ${req.params.id} excluído com sucesso!`); // envia mensagem de sucesso
}); // fecha rota DELETE "/listaNomes/:id"

// =====================
// ROTAS DE TIMES
// =====================

// GET: lista todos os times
app.get("/listaTimes", (req, res) => { // abre rota GET "/listaTimes"
  res.send(times); // envia array times completo
}); // fecha rota GET "/listaTimes"

// GET: retorna time por ID
app.get("/listaTimes/:id", (req, res) => { // abre rota GET "/listaTimes/:id"
  const resultado = buscarTimeId(req.params.id)[0]; // pega primeiro elemento do array retornado
  if (!resultado) { // verifica se resultado é undefined
    return res.send(`Time com id ${req.params.id} não encontrado.`); // envia mensagem de erro
  }
  res.json(resultado); // envia objeto como JSON
}); // fecha rota GET "/listaTimes/:id"

// POST: adiciona novo time
app.post("/listaTimes", (req, res) => { // abre rota POST "/listaTimes"
  const { id, nome, estado, titulos } = req.body; // desestruturação do corpo da requisição
  if (!id || !nome || !estado || titulos === undefined) { // verifica campos obrigatórios
    return res.send("Dados inválidos. Informe id, nome, estado e titulos."); // envia mensagem de erro
  }
  times.push({ id, nome, estado, titulos }); // adiciona objeto no array
  res.send('Time cadastrado com sucesso!'); // envia mensagem de sucesso
}); // fecha rota POST "/listaTimes"

// DELETE: remove time pelo ID
app.delete("/listaTimes/:id", (req, res) => { // abre rota DELETE "/listaTimes/:id"
  const index = buscarIdTimes(req.params.id); // busca índice do time pelo id
  if (index === -1) { // se índice não existir
    return res.send(`Não foi possível excluir: time com id ${req.params.id} não existe.`); // envia mensagem de erro
  }
  times.splice(index, 1); // remove elemento do array usando splice
  res.send(`Time com id ${req.params.id} excluído com sucesso!`); // envia mensagem de sucesso
}); // fecha rota DELETE "/listaTimes/:id"
