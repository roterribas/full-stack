/* 
🧮 Programa: Verificar se o aluno foi aprovado

Enunciado:
Crie um programa que peça a nota de um aluno (de 0 a 10) e mostre:
- "Aprovado" se a nota for maior ou igual a 6
- "Reprovado" se a nota for menor que 6
*/

// Pede para o usuário digitar a nota e converte para número
let nota = Number(prompt("Digite a nota do aluno (0 a 10): "));

// Verifica se a nota é maior ou igual a 6
if (nota >= 6) {
    // Se for 6 ou mais, o aluno está aprovado
    document.write("🎉 Aprovado!");
} else {
    // Caso contrário (menor que 6), o aluno está reprovado
    document.write("❌ Reprovado.");
}
