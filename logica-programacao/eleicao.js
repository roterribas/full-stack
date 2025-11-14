/*
Algoritmo: Anos de Eleições

Início
    Declare anoInicio, anoAtual como números
    anoAtual ← ano da máquina

    Escreva("Digite o ano da primeira eleição que você acompanhou:")
    Leia anoInicio

    Enquanto anoInicio ≤ anoAtual faça
        Escreva("Ano de eleição: ", anoInicio)
        anoInicio ← anoInicio + 2
    FimEnquanto
Fim
*/

let anoAtual = new Date().getFullYear(); // pega o ano da máquina

let anoInicio = Number(prompt("Digite o ano da primeira eleição que você acompanhou:"));

while (anoInicio <= anoAtual) {
    document.write("Ano de eleição: " + anoInicio + "<br>");
    anoInicio = anoInicio + 2;
}


let anoAtual = new Date().getFullYear();
let ano = 2000;

while (ano <= anoAtual) {
    if (ano % 2 === 0) {
        document.write(ano + " é PAR<br>");
    } else {
        document.write(ano + " é ÍMPAR<br>");
    }

    ano++;
}
