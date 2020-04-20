function addTarefa() {
    let txtTarefa = document.getElementById('novaTar');
    let divConteudo = document.getElementById('conteudo');

    if (txtTarefa.value.length > 0) {
        let divTarefa = document.createElement('div');
        divTarefa.setAttribute('class', 'secaoTarefa');

        let check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        check.setAttribute('name', 'checkTarefa');
        check.setAttribute('class', 'checkTar');

        let paragrafo = document.createElement('p');
        paragrafo.innerText = txtTarefa.value;

        let img = document.createElement('img');
        img.setAttribute('src', 'img/close.png');
        img.setAttribute('alt', 'Excluir Tarefa');

        divTarefa.appendChild(check);
        divTarefa.appendChild(paragrafo);
        divTarefa.appendChild(img);

        divConteudo.appendChild(divTarefa);

        txtTarefa.value = '';
    }
}