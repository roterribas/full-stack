const anoAtual = 2025;

// Pergunta o nome e a idade
let nome = prompt("QUAL O SEU NOME?");
let idade = Number(prompt("QUAL A SUA IDADE?"));

// Calcula o ano de nascimento
let anoNascimento = anoAtual - idade;

// Exibe o resultado
console.log(nome + ", você nasceu em: " + anoNascimento);
