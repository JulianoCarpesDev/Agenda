const nome = document.querySelector('.input');
const btn = document.querySelector('.btn'); //
const telefone = document.querySelector('.telefone');
const saida = document.querySelector('.contatos');

function criaLI() {
    const li = document.createElement('li');//Criando li
    return li
}

function limpaInput() {
    nome.value = ''; // limpando inputs
    telefone.value = '';
    
}

function criaBotao(outroLi) { // criando botao no li
    outroLi.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';// nome botão
    botaoApagar.setAttribute('class', 'apagar'); // classe botão
    botaoApagar.setAttribute('title', 'Apagar Contato')
    outroLi.appendChild(botaoApagar); //inserindo botão na li do ul
   
}

btn.setAttribute('title', 'Adicionar Contato')

nome.setAttribute('title', 'Inserir Nome')

telefone.setAttribute('title', 'Inserir Telefone')


document.addEventListener('click', function (e) { // verificado click na tela
    const elementoClick = e.target;
    if (elementoClick.classList.contains('apagar')) {
        // se botão foi clicado
        elementoClick.parentElement.remove(); // removendo dados dos inputs
        salvarTarefa(); // salvando o apagar no localStorage
    }
});

function criaContato(textoDosInputs) {
    let liNoUl = criaLI();
    liNoUl.innerText = textoDosInputs;
    saida.appendChild(liNoUl); //adicionando li na ul .contatos
    limpaInput(); // chamando função limpar inputs apos adicionar valores
    criaBotao(liNoUl); //chamando função criaBotao na li do ul
    salvarTarefa();// salvando tarefa
    nome.focus();
}
btn.addEventListener('click', function (e) { 
    //adicionando evento do click

    if (!nome.value || !telefone.value) return;
      // se nada for digitado não adiciona contato
    criaContato(`Nome: ${nome.value} - Telefone: ${telefone.value}`);
    // chamando função criaContato como valores digitados
});

function salvarTarefa() {
    const liDoUl = saida.querySelectorAll('li') // recebendo valores do li
    const listaTarefas = [];// cirando array

    for (let tarefa of liDoUl) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();//apagando 'Apagar' do botão
        listaTarefas.push(tarefaTexto);// array recebendo valores

    }
    const tarefasJSON = JSON.stringify(listaTarefas);// convertendo para Json "tipo string"
    localStorage.setItem('Contatos', tarefasJSON);// salvando localStorage

}

function adicionaTarefasSalvas() { // buscando contatos salvos no localStorage
    const tarefas = localStorage.getItem('Contatos');
    const listaTarefas = JSON.parse(tarefas);// convertendo para o array

    for (let tarefa of listaTarefas) { 
        criaContato(tarefa)
    }
}
adicionaTarefasSalvas() // chamando função