// Descobrir o ano da próxima Copa do Mundo
const anoAtual = 2025;
const ultimoAnoCopa = 2022;
const intervaloCopa = 4;

// Cálculo do próximo ano de Copa
let proximaCopa = ultimoAnoCopa;
while (proximaCopa <= anoAtual) {
    proximaCopa += intervaloCopa;
}

document.write("A próxima Copa do Mundo será em:", proximaCopa);
