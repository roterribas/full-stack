// Importa o framework Express utilizando ES Modules.
// O Express facilita a criação de servidores HTTP e rotas.
import express from "express";

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
//             BANCO DE DADOS FAKE (ARRAY)
// =====================================================

// Array simulando um banco de dados de cadastros.
// Cada objeto representa um usuário armazenado.
const cadastros = [
    {
        id: 1, // Identificador único
        nome: "Fernanda Silva", // Nome da pessoa
        telefone: "11987654321", // Telefone somente números
        cpf: "123.456.789-00", // CPF formatado
        email: "fernanda@gmail.com", // Email
        idade: 28, // Idade da pessoa
        endereco: "Rua das Flores, 123" // Endereço completo
    },
    {
        id: 2,
        nome: "Caio Oliveira",
        telefone: "11922223333",
        cpf: "987.654.321-11",
        email: "caio@gmail.com",
        idade: 32,
        endereco: "Avenida Brasil, 450"
    },
    {
        id: 3,
        nome: "Pedro Almeida",
        telefone: "21999998888",
        cpf: "321.654.987-55",
        email: "pedro@hotmail.com",
        idade: 45,
        endereco: "Rua Central, 999"
    }
];



// =====================================================
//                   ROTAS CRUD COMPLETAS
// =====================================================



// -----------------------------
// ROTA GET - LISTAR TODOS
// -----------------------------
// Retorna todos os cadastros presentes no array.
app.get("/cadastros", (req, res) => {
    res.json(cadastros); // Envia o array completo em formato JSON
});



// -----------------------------
// ROTA GET - BUSCAR POR ID
// -----------------------------
// :id = parâmetro enviado na URL
app.get("/cadastros/:id", (req, res) => {
    // Converte o ID recebido para número
    const id = Number(req.params.id);

    // Procura dentro do array um objeto cujo id seja igual ao informado
    const item = cadastros.find(c => c.id === id);

    // Caso não encontre, retorna erro 404
    if (!item) {
        return res.status(404).json("Cadastro não encontrado");
    }

    // Caso encontre, retorna o objeto
    res.json(item);
});



// -----------------------------
// ROTA POST - CRIAR CADASTRO
// -----------------------------
// Permite adicionar um novo cadastro ao array.
app.post("/cadastros", (req, res) => {
    // Obtém os dados enviados
    const novoCadastro = req.body;

    // Gera automaticamente um novo ID com base no último item da lista
    novoCadastro.id = cadastros.length ? cadastros[cadastros.length - 1].id + 1 : 1;

    // Adiciona ao array
    cadastros.push(novoCadastro);

    // Retorna o novo item criado
    res.status(201).json(novoCadastro);
});



// -----------------------------
// ROTA PUT - EDITAR POR ID
// -----------------------------
// Permite atualizar os dados de um cadastro existente.
app.put("/cadastros/:id", (req, res) => {
    const id = Number(req.params.id); // ID da URL
    const index = cadastros.findIndex(c => c.id === id); // Procura índice no array

    // Se não existir, retorna erro
    if (index === -1) {
        return res.status(404).json("Cadastro não encontrado");
    }

    // Atualiza mantendo o mesmo ID
    cadastros[index] = { ...cadastros[index], ...req.body };

    // Retorna o item atualizado
    res.json(cadastros[index]);
});



// -----------------------------
// ROTA DELETE - EXCLUIR POR ID
// -----------------------------
// Remove um cadastro do array com base no ID.
app.delete("/cadastros/:id", (req, res) => {
    const id = Number(req.params.id); // Pega id da URL

    // Procura posição do item no array
    const index = cadastros.findIndex(c => c.id === id);

    // Se não existir, retorna erro
    if (index === -1) {
        return res.status(404).json("Cadastro não encontrado");
    }

    // Remove o item usando splice
    const removido = cadastros.splice(index, 1);

    // Retorna o item removido
    res.json({
        mensagem: "Cadastro excluído com sucesso",
        removido: removido[0]
    });
});



// =====================================================
//         EXPORTAÇÃO DO APP PARA OUTRO ARQUIVO
// =====================================================

// Exporta o app para que outro arquivo possa iniciar o servidor (ex: server.js)
export default app;
