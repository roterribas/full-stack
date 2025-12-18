// Importa o framework Express utilizando ES Modules.
// O Express facilita a criação de servidores HTTP e rotas.
import express from "express";

// Importa a conexão com o banco de dados (mysql2).
import conexao from "../infra/conexao.js";

const router = express.Router();

// Rota GET para listar todas as seleções
router.get("/selecoes", (req, res) => {
    const sql = "SELECT * FROM selecoes";

    conexao.query(sql, (erro, result) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        res.status(200).json(result);
    });
});

export default router;