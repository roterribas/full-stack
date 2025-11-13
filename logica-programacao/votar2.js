/* 
Programa: Situação de voto
Enunciado:
Crie um programa que peça a idade de uma pessoa e mostre
uma mensagem dizendo se ela pode votar ou ainda não pode votar.

Desafio extra:
- Se a idade for menor que 16 → "Não pode votar"
- Se for entre 16 e 17 → "Voto opcional"
- Se for 18 ou mais → "Voto obrigatório"
*/

// Pede a idade da pessoa e converte o valor para número
let idade = Number(prompt("Digite sua idade: "));

// Verifica as condições de idade
if (idade < 16) {
    // Se for menor que 16, ainda não pode votar
    document.write("🚫 Não pode votar.");
} 
else if (idade >= 16 && idade < 18) {
    // Se for 16 ou 17 anos, o voto é opcional
    document.write("🟡 Voto opcional.");
} 
else {
    // Se tiver 18 anos ou mais, o voto é obrigatório
    document.write("🗳️ Voto obrigatório!");
}
