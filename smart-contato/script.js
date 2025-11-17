// Máscara telefone
const tel = document.getElementById("telefone");

tel.addEventListener("input", () => {
    let v = tel.value.replace(/\D/g, "");

    if (v.length > 11) v = v.slice(0, 11);

    if (v.length <= 10) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
        v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    tel.value = v;
});

// Lista
let contatos = [];
let editando = -1;

document.getElementById("btnSalvar").addEventListener("click", salvar);

function salvar() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    if (!nome || !email || !telefone) {
        alert("Preencha todos os campos!");
        return;
    }

    if (editando >= 0) {
        contatos[editando] = { nome, email, telefone };
        editando = -1;
    } else {
        contatos.push({ nome, email, telefone });
    }

    limparCampos();
    render();
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
}

function render() {
    const lista = document.getElementById("listaContatos");

    if (contatos.length === 0) {
        lista.innerHTML = "A lista aparecerá aqui...";
        return;
    }

    lista.innerHTML = "";

    contatos.forEach((c, i) => {
        lista.innerHTML += `
            <div class="item">
                <div>
                    <b>${c.nome}</b><br>
                    ${c.email}<br>
                    ${c.telefone}
                </div>

                <div class="acoes">
                    <button class="editar" onclick="editar(${i})">Editar</button>
                    <button class="apagar" onclick="apagar(${i})">Excluir</button>
                </div>
            </div>
        `;
    });
}

function editar(i) {
    document.getElementById("nome").value = contatos[i].nome;
    document.getElementById("email").value = contatos[i].email;
    document.getElementById("telefone").value = contatos[i].telefone;
    editando = i;
}

function apagar(i) {
    contatos.splice(i, 1);
    render();
}
