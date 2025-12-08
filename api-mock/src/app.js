// Importa o framework Express utilizando ES Modules.
// O Express facilita a criação de servidores HTTP e rotas.
import express from "express";

// Importa a conexão com o banco (arquivo que você tem em infra/conexao.js).
import conexao from "../infra/conexao.js";

// Cria a instância da aplicação Express — é o objeto que registra rotas e middlewares.
const app = express();

// Middleware que converte JSON do corpo das requisições em objeto JS (req.body).
app.use(express.json());

// ===================== ROTA PRINCIPAL =====================

// Define uma rota HTTP GET na raiz "/".
// Quando alguém acessar http://localhost:3000/ a função abaixo será executada.
app.get("/", (req, res) => {
    // Envia uma resposta simples de texto ao cliente.
    res.send("BEM VINDO A COPA DO MUNDO!");
});

// ===================== LISTAR TODAS AS SELEÇÕES =====================

// Define rota GET para "/selecoes" que retorna todas as seleções na tabela.
app.get("/selecoes", (req, res) => {
    // Monta a query SQL para selecionar todos os registros da tabela "selecoes".
    const sql = "SELECT * FROM selecoes";

    // Executa a query usando a conexão (mysql2). Recebe um callback com erro e resultado.
    conexao.query(sql, (erro, result) => {
        // Se ocorrer um erro na consulta ao banco, respondemos com status 500 e a mensagem do erro.
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        // Se deu certo, retornamos o resultado (array de registros) com status 200.
        res.status(200).json(result);
    });
});

// ===================== BUSCAR UMA SELEÇÃO POR ID =====================

// Define rota GET com parâmetro de rota ":id".
app.get("/selecoes/:id", (req, res) => {
    // Lê o id enviado na URL via req.params (ex: /selecoes/3 -> id = "3").
    const id = req.params.id;

    // Query SQL com placeholder para evitar SQL injection.
    const sql = "SELECT * FROM selecoes WHERE id = ?";

    // Executa a query passando os parâmetros em um array (o primeiro ? será substituído por id).
    conexao.query(sql, [id], (erro, result) => {
        // Se ocorrer erro na consulta, retornamos 500 com a mensagem.
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        // Se não encontrar registros (array vazio), retornamos 404 (não encontrado).
        if (result.length === 0) {
            return res.status(404).json({ mensagem: "Seleção não encontrada" });
        }

        // Se encontrar, retornamos o primeiro registro (result[0]) com status 200.
        res.status(200).json(result[0]);
    });
});

// ===================== DELETAR UMA SELEÇÃO POR ID =====================

// Define rota DELETE com parâmetro ":id".
app.delete("/selecoes/:id", (req, res) => {
    // Lê o id da URL.
    const id = req.params.id;

    // Query SQL para deletar o registro correspondente ao id.
    const sql = "DELETE FROM selecoes WHERE id = ?";

    // Executa a query de DELETE passando o id como parâmetro.
    conexao.query(sql, [id], (erro, result) => {
        // Se ocorrer erro, respondemos com 500 e a mensagem do erro.
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        // result.affectedRows indica quantas linhas foram afetadas pelo DELETE.
        // Se for 0, significa que não havia registro com esse id.
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Seleção não encontrada" });
        }

        // Se chegou aqui, a exclusão foi bem-sucedida — retornamos uma mensagem de sucesso.
        res.status(200).json({ mensagem: "Seleção deletada com sucesso" });
    });
});

// ===================== EXPORTAÇÃO =====================

// Exporta o app para que outro arquivo (ex: server.js) possa importar e iniciar o servidor.
export default app;
