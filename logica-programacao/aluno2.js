/* 
🍎 Programa: Verificar se o aluno foi aprovado

Enunciado:
Crie um programa que peça a nota de um aluno (de 0 a 10) e mostre:

- "Aprovado" se a nota for maior ou igual a 6
- "Recuperação" se a nota for entre 4 e 5.9
- "Reprovado" se a nota for menor que 4
*/

// Pede para o usuário digitar a nota e converte o valor para número
let nota = Number(prompt("Digite a nota do aluno (0 a 10): "));

// Verifica se a nota está dentro do intervalo válido
if (nota < 0 || nota > 10) {
    // Caso o usuário digite algo fora de 0 a 10
    document.write("⚠️ Nota inválida! Digite um valor entre 0 e 10.");
}
else if (nota >= 6) {
    // Se a nota for 6 ou mais, o aluno está aprovado
    document.write("🎉 Aprovado!");
}
else if (nota >= 4 && nota < 6) {
    // Se estiver entre 4 e 5.9, o aluno está em recuperação
    document.write("🟡 Recuperação.");
}
else {
    // Se for menor que 4, o aluno está reprovado
    document.write("❌ Reprovado.");
}
