/*
Algoritmo: Anos de Copa do Mundo

Início
    Declare anoInicio, anoAtual como números
    anoAtual ← 2025

    Escreva("Digite o ano da primeira Copa do Mundo que você viu:")
    Leia anoInicio

    Enquanto anoInicio ≤ anoAtual faça
        Escreva("Copa do Mundo: ", anoInicio)
        anoInicio ← anoInicio + 4
    FimEnquanto
Fim
*/

let anoAtual = 2025;

let anoInicio = Number(prompt("Digite o ano da primeira Copa do Mundo que você viu:"));

while (anoInicio <= anoAtual) {
    document.write("Copa do Mundo: " + anoInicio + "<br>");
    anoInicio = anoInicio + 4;
}
