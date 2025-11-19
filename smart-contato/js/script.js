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
// CARREGA CONTATOS DO LOCALSTORAGE
// =====================
let contatos = JSON.parse(localStorage.getItem("contatos")) || [];
let editIndex = null;


// =====================
// SALVAR NO LOCALSTORAGE
// =====================
function salvarLocal() {
    localStorage.setItem("contatos", JSON.stringify(contatos));
}


// =====================
// ALTERAR TEXTO DO BOTÃO
// =====================
function atualizarBotao() {
    const botao = document.querySelector("button[type='submit']");
    botao.textContent = editIndex !== null ? "Atualizar" : "Cadastrar";
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
        // EDITANDO
        contatos[editIndex] = { nome, email, telefone };
        editIndex = null;
    } else {
        // CADASTRO NOVO
        contatos.push({ nome, email, telefone });
    }

    salvarLocal();
    limparCampos();
    atualizarBotao();
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
                <button class="btn-editar" onclick="editar(${index})">✏️</button>
                <button class="btn-remover" onclick="remover(${index})">🗑️</button>
            </div>
        `;

        lista.appendChild(li);
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
    atualizarBotao();
}


// =====================
// REMOVER
// =====================
function remover(index) {
    if (confirm("Tem certeza que deseja remover?")) {
        contatos.splice(index, 1);
        salvarLocal();
        atualizarLista();
    }
}


// =====================
// LIMPAR CAMPOS
// =====================
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
}


// =====================
// CARREGAR LISTA AO INICIAR
// =====================
document.addEventListener("DOMContentLoaded", () => {
    atualizarLista();
    atualizarBotao();
});
