// Importa o framework Express utilizando ES Modules.
// O Express facilita a criação de servidores HTTP e rotas.
import express from "express";
import selecoesRoutes from "../routes/selecoes.routes.js"


// Cria a instância da aplicação Express.
const app = express();

// Middleware que permite o uso de JSON no corpo das requisições.
app.use(express.json());

// ===================== ROTA PRINCIPAL =====================

// Rota GET raiz
app.get("/", (req, res) => {
    res.send("BEM VINDO A COPA DO MUNDO!");
});

// Usando a rota de selecoes
app.use(selecoesRoutes);

// ===================== EXPORTAÇÃO =====================

// Exporta o app para ser usado no server.js
export default app;
