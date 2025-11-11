/*
    Vamos criar um programa, que o usuário executa uma função
    e dentro dessa função existe uma frase.
    Pode pular linhas.
*/

function mostrarFrase(frase) {
    document.write(frase);
    document.write("<br>");
}

// Chamadas da função (cada uma com uma frase diferente)
mostrarFrase("Olá! Você executou uma função!");
mostrarFrase("Esta frase está dentro da função!");
mostrarFrase("Podemos pular linha usando <br> 😄");
