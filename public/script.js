let cadastrarNome = document.getElementById('cadastrarNomeJogo')
let cadastrarGenero = document.getElementById('cadastrarGeneroJogo')
let cadastrarAno = document.getElementById('cadastrarAnoJogo')

let alterarNome = document.getElementById('alterarNomeJogo')
let alterarGenero = document.getElementById('alterarGeneroJogo')
let alterarAno = document.getElementById('alterarAnoJogo')

let idDeletar = document.getElementById('deletarJogo')

async function carregaJogos() {
    const resposta = await fetch("/jogos");
    const jogos = await resposta.json();

    let opcao = document.getElementById('switch');

    if(opcao.checked){
        card(jogos);
    }
    else{
        tabela(jogos);
    }
} 

async function verificarExistenciaDeID(id, frase, cor){
    const resposta = await fetch("/jogos");
    const jogos = await resposta.json();

    let idVerificar = Number(document.getElementById(id).value);

    let existe = jogos.some(u => u.id === idVerificar)

    if(existe && id === 'deletarJogo'){
        mudarDisplayExcluir()
    }
    else if(existe && id === 'alterarJogo'){
        abrirAlterar()
    }
    else{
        let p = document.getElementById(frase)
        p.textContent = "ID não existe"
        p.style.color = "red"
        document.getElementById(cor).style.display = "none"

        setTimeout(() =>{
            p.textContent = "Digite o id do jogo que quer"
            p.style.color = "rgb(223, 221, 221)"
            document.getElementById(cor).style.display = "flex"
        }, 3000)
        limparInput(document.getElementById(id))
    }
}

function limparInput(input){
    input.value = "";
}

async function cadastrarJogo(nomeJogo, generoJogo, anoJogo) {
    await fetch("/jogos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nome: nomeJogo, genero: generoJogo, ano: anoJogo})
    });

    limparInput(cadastrarNome)
    limparInput(cadastrarGenero)
    limparInput(cadastrarAno)

    carregaJogos()
}

function capturarTexto(){
    nome = cadastrarNome.value;
    nome = nome === "" ? "Não definido" : formatarTexto(nome)

    genero = cadastrarGenero.value;
    genero = genero === "" ? "Não definido" : formatarTexto(genero)

    ano = cadastrarAno.value;
    ano = ano === "" ? "Não definido" : ano

    cadastrarJogo(nome, genero, ano)
}

async function alterarJogo(id, nomeJogo, generoJogo, anoJogo){
    await fetch(`/jogos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nome: nomeJogo, genero: generoJogo, ano: anoJogo})
    });
    
    alterarDisplayAlterar()
    carregaJogos()
}

function capturarId(){
    let id = document.getElementById('alterarJogo').value
    limparInput(document.getElementById('alterarJogo'))
    capturarAlteracao(id)
}
function capturarAlteracao(id){
    let nome = alterarNome.value
    nome = formatarTexto(nome)
    limparInput(alterarNome)

    let genero = alterarGenero.value
    genero = formatarTexto(genero)
    limparInput(alterarGenero)

    let ano = alterarAno.value
    limparInput(alterarAno)

    alterarJogo(id, nome, genero, ano)
}

async function excluirJogo(id) {
   await fetch(`/jogos/${id}`, {
       method: "DELETE"
   });

   limparInput(idDeletar)
   alterarDisplayDeletar()
   carregaJogos()
}

function mudarDisplayExcluir(){
    deletacao.style.display = "none";
    confirmarExcluir.style.display = "flex";
}

function confirmarExclusaoJogo(){
    let id = idDeletar.value;
    excluirJogo(id)
}

function retornarDisplayExcluir(){
    confirmarExcluir.style.display = "none";
    deletacao.style.display = "flex";
    limparInput(idDeletar)
}

function formatarTexto(text){
    let texto = text.trim().toLowerCase();
    let formatado = "";

    for(let i = 0; i < texto.length; i++){
        formatado += (i === 0) || (texto.charAt(i - 1) === " ") ? texto.charAt(i).toUpperCase() : texto.charAt(i)
    }
    return formatado
}

function card(games){

        let mostrar = document.getElementById('mostrar');
        mostrar.textContent = "";

        let jgs = document.createElement('div');
        jgs.id = "card";

            for(let i = 0; i < games.length; i++){
                let div = document.createElement('div');
                div.className = "card";

                let title = document.createElement("div");
                title.className = "title";
                title.textContent = `Jogo #${games[i].id}`;
                
                let icon = document.createElement("i");
                icon.className = "bi bi-controller";
                title.appendChild(icon);
                div.appendChild(title);

                let nome = document.createElement('p');
                nome.textContent = `Nome: ${games[i].nome}`;
                div.appendChild(nome);

                let genero = document.createElement('p');
                genero.textContent = `Gênero: ${games[i].genero}`;
                div.appendChild(genero);

                let ano = document.createElement('p');
                ano.textContent = `Ano: ${games[i].ano}`;
                div.appendChild(ano);

                jgs.appendChild(div);
            }
        document.getElementById('mostrar').appendChild(jgs);
}

function tabela(games){

    let mostrar = document.getElementById('mostrar');
    mostrar.textContent = "";
    
    let tabela = document.createElement('table');
    tabela.id = 'tabela';
    tabela.border = '1';

    let tr1 = document.createElement('tr');

    let thId = document.createElement('th');
    thId.textContent = 'ID';

    let thNome = document.createElement('th');
    thNome.textContent = 'Nome';

    let thGenero = document.createElement('th');
    thGenero.textContent = 'Gênero';

    let thAno = document.createElement('th');
    thAno.textContent = 'Lançamento';

    tr1.appendChild(thId);
    tr1.appendChild(thNome);
    tr1.appendChild(thGenero);
    tr1.appendChild(thAno);

    tabela.appendChild(tr1);

    games.forEach(jogo => {

        let tr = document.createElement('tr');

        let tdId = document.createElement('td');
        tdId.textContent = jogo.id;

        let tdNome = document.createElement('td');
        tdNome.textContent = jogo.nome;

        let tdGenero = document.createElement('td');
        tdGenero.textContent = jogo.genero;

        let tdAno = document.createElement('td');
        tdAno.textContent = jogo.ano;

        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdGenero);
        tr.appendChild(tdAno);

        tabela.appendChild(tr);
    });

    mostrar.appendChild(tabela);
}

function mudarLayout(){
    carregaJogos();
}

let alteracao = document.getElementsByClassName('alteracao')[0];
let deletacao = document.getElementsByClassName('deletar')[0];
let cadastracao = document.getElementsByClassName('cadastro')[0];

let cadastroJogo = document.getElementById('cadastrar');
let mudarJogo = document.getElementById('alterar');
let excluirGame = document.getElementById('excluir');

let idAlterar = document.getElementById('idAlterar');
let alterarCaracteristica = document.getElementById('alterarCaracteristica');
let confirmarExcluir = document.getElementById('confirmarExcluir');

function alterarDisplayCadastro(){
    alteracao.style.display = "none";
    deletacao.style.display = "none";
    cadastracao.style.display = "flex"
    confirmarExcluir.style.display = "none";

    mudarJogo.style.border = "1px solid #f0f0f0";
    excluirGame.style.border = "1px solid #f0f0f0";
    cadastroJogo.style.borderBottom = "none";
}

function alterarDisplayAlterar(){
    cadastracao.style.display = "none";
    deletacao.style.display = "none";
    alteracao.style.display = "flex";
    alterarCaracteristica.style.display = "none";
    confirmarExcluir.style.display = "none";

    mudarJogo.style.borderBottom = "none";
    excluirGame.style.border = "1px solid #f0f0f0";
    cadastroJogo.style.border = "1px solid #f0f0f0";
    idAlterar.style.display = "flex"
}

function alterarDisplayDeletar(){
    cadastracao.style.display = "none";
    deletacao.style.display = "flex";
    alteracao.style.display = "none";
    confirmarExcluir.style.display = "none";

    mudarJogo.style.border = "1px solid #f0f0f0";
    excluirGame.style.borderBottom = "none";
    cadastroJogo.style.border = "1px solid #f0f0f0";
}

function abrirAlterar(){
    idAlterar.style.display = "none"
    alterarCaracteristica.style.display = "flex";
}

alterarDisplayCadastro()

carregaJogos();