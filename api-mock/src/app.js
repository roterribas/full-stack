// Importa o framework Express utilizando ES Modules.
// O Express facilita a criação de servidores HTTP e rotas.
import express from "express";
import conexao from "/infra/conexao";

// Cria uma instância padrão do Express, responsável por gerenciar rotas e middlewares.
const app = express();

// Middleware que permite que o servidor interprete JSON enviado no corpo das requisições.
// Sem isso, req.body viria vazio.
app.use(express.json());



// =====================================================
//                      ROTAS BÁSICAS
// =====================================================

// Rota GET para o caminho principal "/"
// Quando alguém acessar http://localhost:3000/ o servidor retornará a mensagem abaixo.
app.get("/", (req, res) => {
    res.send("CONECTADO AO SERVIDOR!🗄");
});

// =====================================================
//         EXPORTAÇÃO DO APP PARA OUTRO ARQUIVO
// =====================================================

// Exporta o app para que outro arquivo possa iniciar o servidor (ex: server.js)
export default app;
