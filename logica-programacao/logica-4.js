/*
  - Crie uma variável numbers, igual abaixo:
  const numbers = [90, 10, 30];
  
  utilize um for loop para somar todos os números do array;
  - Exiba na tela o valor total
  O resultado tem que ser 130
*/

const numbers = [90, 10, 30];
let total = 0;

for (let i = 0; i < numbers.length; i++) {
  total = total + numbers[i];
}

console.log("O total da soma " + numbers + " é:" + total);