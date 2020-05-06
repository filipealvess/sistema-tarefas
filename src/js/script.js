/* elementos */
const lista = document.getElementById('lista').firstElementChild;
const textoTarefa = document.getElementById('textoNovaTarefa');

/* classes */
const TACHADO = "tachado";
const CHECKATIVO = "circulo-completo";
const CHECKINATIVO = "circulo";
const CHECKCONTEUDO = "✓";

/* variáveis */
let LISTA;
let id;

/* OBTENDO ITENS DO ARMAZENAMENTO LOCAL */
let dados = localStorage.getItem("TAREFAS");

if(dados){
    LISTA = JSON.parse(dados);
    id = LISTA.length;
    carregarLista(LISTA);
} else{
    LISTA = [];
    id = 0;
}

function carregarLista(array){
    array.forEach((item) => {
        adicionarTarefa(item.nome, item.id, item.concluido, item.excluido);
    });
}

/* ADIÇÃO DAS TAREFAS */
function adicionarTarefa(tarefa, id, concluido, excluido) {
    if (!excluido) {
        const LINHA = concluido ? TACHADO : "";
        const VALOR = concluido ? CHECKCONTEUDO : "";
        const COMPLETO = concluido ? CHECKATIVO : CHECKINATIVO;

        const item = `<tr id="${id}">
                        <td class="col1"><div class="${COMPLETO}" data-trabalho="concluir">${VALOR}</div></td>
                        <td class="col2"><div class="texto ${LINHA}">${tarefa}</div></td>
                        <td class="col3"><div class="lixeira" data-trabalho="excluir">&times;</div></td>
                      </tr>
        `;

        const posicao = "beforeend";

        lista.insertAdjacentHTML(posicao, item);
        textoTarefa.value = "";
    }
}

function checarTarefa() {
    if (textoTarefa.value) {
        const tarefa = textoTarefa.value;
        adicionarTarefa(tarefa, id, false, false);
        
        LISTA.push({
            nome: tarefa,
            id: id,
            concluido: false,
            excluido: false
        });

        localStorage.setItem("TAREFAS", JSON.stringify(LISTA));

        id++;
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === "enter") {
        checarTarefa();
    }
});

function concluirTarefa(elemento){
    const check = elemento.children[0].firstElementChild;
    const texto = elemento.children[1].firstElementChild;

    texto.classList.toggle(TACHADO);

    check.classList.toggle(CHECKATIVO);
    check.classList.toggle(CHECKINATIVO);

    if(check.textContent === ""){
        check.textContent = "✓";
    } else{
        check.textContent = "";
    }

    LISTA[elemento.id].concluido = LISTA[elemento.id].concluido ? false : true;
}

function excluirTarefa(elemento){
    elemento.parentNode.removeChild(elemento);

    LISTA[elemento.id].excluido = true;
}

lista.addEventListener("click", (event) => {
    const elemento = event.target;
    const trabalho = elemento.dataset.trabalho;
    
    if(trabalho === "concluir"){
        concluirTarefa(elemento.parentNode.parentNode);
    } else if(trabalho === "excluir"){
        excluirTarefa(elemento.parentNode.parentNode);
    }

    localStorage.setItem("TAREFAS", JSON.stringify(LISTA));
});