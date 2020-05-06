/* elementos */
const lista = document.getElementById('lista').firstElementChild;
const textoTarefa = document.getElementById('textoNovaTarefa');

/* classes */
const TACHADO = "tachado";
const CHECKATIVO = "circulo-completo";
const CHECKINATIVO = "circulo";
const CHECKCONTEUDO = "✓";

/* variáveis */
let id = 0;

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
        adicionarTarefa(textoTarefa.value, id, false, false);
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
}

function excluirTarefa(elemento){
    console.log(elemento);
    elemento.parentNode.removeChild(elemento);
}

lista.addEventListener("click", (event) => {
    const elemento = event.target;
    const trabalho = elemento.dataset.trabalho;
    
    if(trabalho === "concluir"){
        concluirTarefa(elemento.parentNode.parentNode);
    } else if(trabalho === "excluir"){
        excluirTarefa(elemento.parentNode.parentNode);
    }
});