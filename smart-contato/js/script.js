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
    if (!botao) return;
    botao.textContent = editIndex !== null ? "Atualizar" : "Cadastrar";

    // se você usar classe .btn-atualizar em vez de só texto, pode alternar a classe:
    if (editIndex !== null) {
        botao.classList.add("btn-atualizar");
    } else {
        botao.classList.remove("btn-atualizar");
    }
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
    const endereco = document.getElementById("endereco") ? document.getElementById("endereco").value.trim() : "";

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
        contatos[editIndex] = { nome, email, telefone, endereco };
        editIndex = null;
    } else {
        // CADASTRO NOVO
        contatos.push({ nome, email, telefone, endereco });
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

        // monta o HTML incluindo o endereço (se existir)
        const enderecoHtml = contato.endereco ? `<div class="contato-endereco">${contato.endereco}</div>` : "";

        li.innerHTML = `
            <div>
                <div class="contato-nome">${contato.nome}</div>
                <div class="contato-email">${contato.email}</div>
                <div class="contato-telefone">${contato.telefone}</div>
                ${enderecoHtml}
            </div>

            <div class="acoes-contato">
                <button class="btn-editar" onclick="editar(${index})" aria-label="Editar contato">✏️</button>
                <button class="btn-remover" onclick="remover(${index})" aria-label="Remover contato">🗑️</button>
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
    if (document.getElementById("endereco")) {
        document.getElementById("endereco").value = contato.endereco || "";
    }

    editIndex = index;
    atualizarBotao();

    // focar no nome para UX
    document.getElementById("nome").focus();
}


// =====================
// REMOVER
// =====================
function remover(index) {
    if (confirm("Tem certeza que deseja remover?")) {
        contatos.splice(index, 1);
        salvarLocal();
        atualizarLista();
        // se estava editando esse índice, cancelar edição
        if (editIndex === index) {
            editIndex = null;
            limparCampos();
            atualizarBotao();
        }
    }
}


// =====================
// LIMPAR CAMPOS
// =====================
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
    if (document.getElementById("endereco")) {
        document.getElementById("endereco").value = "";
    }
}


// =====================
// CARREGAR LISTA AO INICIAR
// =====================
document.addEventListener("DOMContentLoaded", () => {
    atualizarLista();
    atualizarBotao();
});
