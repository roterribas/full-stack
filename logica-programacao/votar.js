/* 
Programa: Verifica se a pessoa pode votar
Enunciado: 
Crie um programa que peça a idade de uma pessoa 
e mostre uma mensagem dizendo se ela pode votar 
ou ainda não pode votar.
*/

// Pede a idade do usuário e converte o valor para número
let idade = Number(prompt("Digite sua idade: "));

// Verifica se a idade é maior ou igual a 16 (idade mínima para votar no Brasil)
if (idade >= 16) {
    // Se for 16 ou mais, mostra mensagem dizendo que pode votar
    document.write("🗳️ Você já pode votar!");
} else {
    // Caso contrário (menor que 16), mostra que ainda não pode votar
    document.write("🚫 Você ainda não pode votar.");
}
