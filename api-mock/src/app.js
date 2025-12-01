import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("ola Node.js")
})

export default app;


const cadastros = [
{
id: 1,
nome: "Fernanda Silva",
telefone: "11987654321",
cpf: "123.456.789-00",
email: "fernanda@gmail.com",
idade: 28,
endereco: "Rua das Flores, 123"
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