/* 
A pessoa só vai para a festa
se for maior que 18 anos
*/

// Pede para o usuário digitar a idade e converte o valor para número
let idade = Number(prompt("Digite sua idade: "));

// Verifica se a idade é maior que 18
if (idade >= 18) {
    // Se for maior que 18, mostra mensagem animada na tela
    document.write("🎉 Pode ir, divirta-se na festa! 🕺💃");
} else {
    // Caso contrário (menor ou igual a 18), mostra que ainda não pode ir
    document.write("😢 Não pode ir, ainda é menor de idade.");
}
