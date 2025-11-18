// =====================
// MÁSCARA DE TELEFONE
// =====================
function mascaraTelefone(value) {
    value = value.replace(/\D/g, "");

    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else {
        value = value.replace(/(\d{2})(\d{4})(\d{4}).*/, "($1) $2-$3");
    }

    return value;
}

document.getElementById("telefone").addEventListener("input", function () {
    this.value = mascaraTelefone(this.value);
});


// =====================
// VALIDAÇÃO DE EMAIL
// =====================
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


// =====================
// LISTA DE CONTATOS
// =====================
let contatos = [];
let editIndex = null;


// =====================
// CARREGAR LOCALSTORAGE
// =====================
function carregarSalvos() {
    const dados = localStorage.getItem("contatos");

    if (dados) {
        contatos = JSON.parse(dados);
        atualizarLista();
    }
}

carregarSalvos();


// =====================
// SALVAR LOCALSTORAGE
// =====================
function salvar() {
    localStorage.setItem("contatos", JSON.stringify(contatos));
}


// =====================
// EVENTO DO FORM
// =====================
document.querySelector(".form").addEventListener("submit", function (event) {
    event.preventDefault();
    cadastrar();
});


// =====================
// CADASTRAR / EDITAR
// =====================
function cadastrar() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    if (nome === "") {
        alert("Digite um nome válido!");
        return;
    }

    if (!validarEmail(email)) {
        alert("Digite um email válido!");
        return;
    }

    if (telefone.replace(/\D/g, "").length < 10) {
        alert("Digite um telefone válido!");
        return;
    }

    if (editIndex !== null) {
        contatos[editIndex] = { nome, email, telefone };
        editIndex = null;
    } else {
        contatos.push({ nome, email, telefone });
    }

    salvar();   // >>> salva tudo
    limparCampos();
    atualizarLista();
}


// =====================
// ATUALIZAR LISTA
// =====================
function atualizarLista() {
    const lista = document.querySelector(".lista");
    lista.innerHTML = "";

    if (contatos.length === 0) {
        lista.innerHTML = `<li class="item-exemplo">A lista aparecerá aqui...</li>`;
        return;
    }

    contatos.forEach((contato, index) => {
        const li = document.createElement("li");
        li.classList.add("item");

        li.innerHTML = `
            <span class="contato-nome">${contato.nome}</span>
            <span class="contato-email">${contato.email}</span>
            <span class="contato-telefone">${contato.telefone}</span>

            <div style="margin-top: 10px;">
                <button class="btn-editar" onclick="editar(${index})">Editar</button>
                <button class="btn-remover" onclick="remover(${index})">Remover</button>
            </div>
        `;

        // ADICIONA NO TOPO
        lista.prepend(li);
    });
}


// =====================
// EDITAR
// =====================
function editar(index) {
    const contato = contatos[index];

    document.getElementById("nome").value = contato.nome;
    document.getElementById("email").value = contato.email;
    document.getElementById("telefone").value = contato.telefone;

    editIndex = index;
}


// =====================
// REMOVER
// =====================
function remover(index) {
    contatos.splice(index, 1);
    salvar(); // >>> salva após remover
    atualizarLista();
}


// =====================
// LIMPAR CAMPOS
// =====================
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
}
