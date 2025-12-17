// Importa o framework Express utilizando ES Modules.
// O Express facilita a criação de servidores HTTP e rotas.
import express from "express";

// Importa a conexão com o banco de dados (mysql2).
import conexao from "../infra/conexao.js";

// Cria a instância da aplicação Express.
const app = express();

// Middleware que permite o uso de JSON no corpo das requisições.
app.use(express.json());

// ===================== ROTA PRINCIPAL =====================

// Rota GET raiz
app.get("/", (req, res) => {
    res.send("BEM VINDO A COPA DO MUNDO!");
});

// ===================== LISTAR TODAS AS SELEÇÕES =====================

// Rota GET para listar todas as seleções
app.get("/selecoes", (req, res) => {
    const sql = "SELECT * FROM selecoes";

    conexao.query(sql, (erro, result) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        res.status(200).json(result);
    });
});

// ===================== BUSCAR SELEÇÃO POR ID =====================

// Rota GET para buscar uma seleção pelo ID
app.get("/selecoes/:id", (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM selecoes WHERE id = ?";

    conexao.query(sql, [id], (erro, result) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ mensagem: "Seleção não encontrada" });
        }

        res.status(200).json(result[0]);
    });
});

// ===================== CADASTRAR UMA SELEÇÃO =====================

// Rota POST para cadastrar uma nova seleção
app.post("/selecoes", (req, res) => {
    const selecao = req.body;

    const sql = "INSERT INTO selecoes SET ?";

    conexao.query(sql, selecao, (erro, result) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        res.status(201).json({
            mensagem: "CADASTRO FEITO COM SUCESSO!",
            idInserido: result.insertId
        });
    });
});

// ===================== ATUALIZAR UMA SELEÇÃO =====================

// Rota PUT para atualizar uma seleção pelo ID
app.put("/selecoes/:id", (req, res) => {
    const id = req.params.id;
    const selecao = req.body;

    const sql = "UPDATE selecoes SET ? WHERE id = ?";

    conexao.query(sql, [selecao, id], (erro, result) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Seleção não encontrada" });
        }

        res.status(200).json({ mensagem: "ATUALIZADO COM SUCESSO!" });
    });
});

// ===================== DELETAR UMA SELEÇÃO =====================

// Rota DELETE para excluir uma seleção pelo ID
app.delete("/selecoes/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM selecoes WHERE id = ?";

    conexao.query(sql, [id], (erro, result) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Seleção não encontrada" });
        }

        res.status(200).json({ mensagem: "Seleção deletada com sucesso" });
    });
});

// ===================== EXPORTAÇÃO =====================

// Exporta o app para ser usado no server.js
export default app;
