// =====================
// MÁSCARA DE TELEFONE (ATUALIZADA - inclui 0800/0300/400X e celular 9 dígitos)
// =====================

// Função que recebe o valor bruto do input e devolve formatado
function mascaraTelefone(value) {
    // Remove tudo que NÃO for dígito (0-9)
    value = value.replace(/\D/g, "");

    // Se começar com 0800 (telefone gratuito), formata como 0800-XXX-XXXX
    // Ex.: 08001234567 -> 0800-123-4567
    if (/^0800/.test(value)) {
        // Pega "0800", depois 3 dígitos e depois 4 dígitos
        return value.replace(/(0800)(\d{3})(\d{4}).*/, "$1-$2-$3");
    }

    // Se começar com 0300 (serviço pago), formata como 0300-XXX-XXXX
    if (/^0300/.test(value)) {
        return value.replace(/(0300)(\d{3})(\d{4}).*/, "$1-$2-$3");
    }

    // Se começar com 400X (ex.: 4001, 4002), formata como 400X-XXXX
    if (/^400\d/.test(value)) {
        return value.replace(/(400\d)(\d{4}).*/, "$1-$2");
    }

    // Limita o tamanho a 11 dígitos (máximo para celulares no Brasil)
    if (value.length > 11) value = value.substring(0, 11);

    // Se tiver exatamente 11 dígitos (celular com 9 dígitos + DDD)
    // Formato final: (DD) 9XXXX-XXXX
    if (value.length === 11) {
        return value.replace(/(\d{2})(\d{1})(\d{4})(\d{4}).*/, "($1) $2$3-$4");
    }

    // Se tiver exatamente 10 dígitos (telefone fixo com DDD)
    // Formato final: (DD) XXXX-XXXX
    if (value.length === 10) {
        return value.replace(/(\d{2})(\d{4})(\d{4}).*/, "($1) $2-$3");
    }

    // Enquanto digita: se tiver mais de 6 dígitos (DDD + parte do número),
    // aplica uma formatação parcial (ex.: (DD) XXXX-XXXX ou (DD) 9XXXX-XXXX parcialmente)
    if (value.length > 6) {
        return value.replace(/(\d{2})(\d{1,5})(\d{1,4}).*/, "($1) $2-$3");
    }

    // Enquanto digita: se tiver mais de 2 dígitos (já digitou o DDD),
    // formata como "(DD) resto"
    if (value.length > 2) {
        return value.replace(/(\d{2})(\d{1,5})/, "($1) $2");
    }

    // Caso contrário (poucos dígitos), retorna apenas os dígitos (sem formatação)
    return value;
}

// Ouvinte que aplica a máscara enquanto o usuário digita no campo com id "telefone"
document.getElementById("telefone").addEventListener("input", function () {
    // 'this' refere-se ao elemento input; atualiza o valor exibido com a máscara
    this.value = mascaraTelefone(this.value);
});



// =====================
// VALIDAÇÃO DE EMAIL
// =====================

// Função que valida um email usando regex simples (checa estrutura básica)
function validarEmail(email) {
    // Regex básico: algo@algo.domínio
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Retorna true se bater com o padrão, false caso contrário
    return regex.test(email);
}



// =====================
// LISTA DE CONTATOS
// =====================

// Array que armazenará os contatos em memória
let contatos = [];

// Índice do contato que está sendo editado; null significa "nenhum em edição"
let editIndex = null;



// =====================
// CARREGAR LOCALSTORAGE
// =====================

// Função que tenta carregar contatos previamente salvos no localStorage
function carregarSalvos() {
    // Busca a chave "contatos" no localStorage (retorna string ou null)
    const dados = localStorage.getItem("contatos");

    // Se houver dados salvos...
    if (dados) {
        // Converte a string JSON de volta para array de objetos
        contatos = JSON.parse(dados);

        // Atualiza a visualização da lista com os contatos carregados
        atualizarLista();
    }
}

// Chama a função de carregamento ao carregar o script/página
carregarSalvos();



// =====================
// SALVAR LOCALSTORAGE
// =====================

// Função que persiste o array 'contatos' no localStorage
function salvar() {
    // Converte o array para string JSON e salva com a chave "contatos"
    localStorage.setItem("contatos", JSON.stringify(contatos));
}



// =====================
// EVENTO DO FORM
// =====================

// Seleciona o formulário com a classe ".form" e adiciona um listener de submit
document.querySelector(".form").addEventListener("submit", function (event) {
    // Evita o comportamento padrão (recarregar a página)
    event.preventDefault();

    // Chama a função que faz cadastro ou edição do contato
    cadastrar();
});



// =====================
// CADASTRAR / EDITAR
// =====================

// Função que cadastra um novo contato ou salva a edição de um existente
function cadastrar() {
    // Pega os valores dos inputs e remove espaços nas extremidades
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    // Validação: nome não pode ficar vazio
    if (nome === "") {
        alert("Digite um nome válido!");
        return; // interrompe a execução da função
    }

    // Validação: email precisa passar pela função validarEmail
    if (!validarEmail(email)) {
        alert("Digite um email válido!");
        return;
    }

    // Validação: telefone precisa ter pelo menos 10 dígitos numéricos (DDD + número)
    // Remove tudo que não é dígito e conta os caracteres resultantes
    if (telefone.replace(/\D/g, "").length < 10) {
        alert("Digite um telefone válido!");
        return;
    }

    // Se estivermos editando (editIndex definido), substitui o contato existente
    if (editIndex !== null) {
        contatos[editIndex] = { nome, email, telefone };
        // Reseta editIndex para indicar que não estamos mais em edição
        editIndex = null;
    } else {
        // Senão, adiciona novo contato ao array
        contatos.push({ nome, email, telefone });
    }

    // Salva alterações no localStorage
    salvar();

    // Limpa os campos do formulário
    limparCampos();

    // Atualiza a lista exibida
    atualizarLista();
}



// =====================
// ATUALIZAR LISTA
// =====================

// Função que reconstrói a lista de contatos na tela
function atualizarLista() {
    // Seleciona o elemento que contém a lista (por classe ".lista")
    const lista = document.querySelector(".lista");

    // Limpa qualquer conteúdo pré-existente
    lista.innerHTML = "";

    // Se não houver contatos, exibe mensagem inicial
    if (contatos.length === 0) {
        lista.innerHTML = `<li class="item-exemplo">A lista aparecerá aqui...</li>`;
        return;
    }

    // Para cada contato no array, cria um item de lista
    contatos.forEach((contato, index) => {
        // Cria um elemento <li>
        const li = document.createElement("li");
        // Adiciona a classe "item" ao <li>
        li.classList.add("item");

        // Define o conteúdo HTML do item com nome, email, telefone e botões
        li.innerHTML = `
            <span class="contato-nome">${contato.nome}</span>
            <span class="contato-email">${contato.email}</span>
            <span class="contato-telefone">${contato.telefone}</span>

            <div style="margin-top: 10px;">
                <button class="btn-editar" onclick="editar(${index})">Editar</button>
                <button class="btn-remover" onclick="remover(${index})">Remover</button>
            </div>
        `;

        // Adiciona o item no topo da lista (prepend), mostrando os mais recentes primeiro
        lista.prepend(li);
    });
}



// =====================
// EDITAR
// =====================

// Abre um contato para edição, preenchendo o formulário com seus dados
function editar(index) {
    // Recupera o objeto contato do array
    const contato = contatos[index];

    // Preenche os inputs com os dados do contato
    document.getElementById("nome").value = contato.nome;
    document.getElementById("email").value = contato.email;
    document.getElementById("telefone").value = contato.telefone;

    // Define editIndex para indicar que estamos editando esse índice
    editIndex = index;
}



// =====================
// REMOVER
// =====================

// Remove um contato do array pelo índice e atualiza armazenamento e UI
function remover(index) {
    // Remove 1 elemento a partir de 'index'
    contatos.splice(index, 1);

    // Salva o array atualizado no localStorage
    salvar();

    // Atualiza a lista exibida
    atualizarLista();
}



// =====================
// LIMPAR CAMPOS
// =====================

// Limpa/zera os campos do formulário
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
}
