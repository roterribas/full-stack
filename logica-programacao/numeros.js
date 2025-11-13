/* 
Programa: Verifica se o número é positivo, negativo ou zero
Enunciado:
Crie um programa que peça um número e mostre uma mensagem
dizendo se ele é positivo, negativo ou igual a zero.
*/

// Pede para o usuário digitar um número e converte o valor para número
let numero = Number(prompt("Digite um número: "));

// Verifica se o número é maior que zero
if (numero > 0) {
    // Se for maior que zero, é positivo
    document.write("🔵 O número é positivo.");
} 
// Verifica se o número é menor que zero
else if (numero < 0) {
    // Se for menor que zero, é negativo
    document.write("🔴 O número é negativo.");
} 
// Caso contrário, é igual a zero
else {
    document.write("⚪ O número é igual a zero.");
}
