
let title;
let url;
let nquestion;
let nlevel = 4;
let allquizz;
let quizzselecionado;


let pontos = 0;

function getallquizz(){

    const request = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")

    request.then(promisse => allquizzin(promisse))
    request.catch(error => allquizzout(error))
}

let allquizzin = (promisse) =>{
    allquizz= promisse.data;
    console.log(allquizz)
    templateallquizz();
}

let allquizzout =(error) => console.log('nao pegou todos quizz');

getallquizz();
console.log(allquizz)

// depois de pegar todos os quizz fazer o template tela 1
function templateallquizz(){
    let main = document.querySelector('.totalquizz');
    let template;
    main.innerHTML ='';
    
    for(let i=0; i<6 ;i++){
        template= `
        <div class="quizz" onclick="runquizz(this)">
        <div class="gradiant-color"></div>
        <label>${allquizz[i].title}</label>
        <img src ="${allquizz[i].image}"/>
    </div>
        `
        main.innerHTML+=template;
    }

} 



// ao clicar em algum dos quizz muda pra tela 2
function runquizz(selecionado){
const elementcont= document.querySelector('.container');
const elementpage2= document.querySelector('.pagina2');
// adicionar a classe escondido para montar a tela 2
//elementhearder.classList.add('escondido');(coloquei comentado pois o topo não desparece)
elementcont.classList.add('escondido');
elementpage2.classList.remove('escondido');
}
//ao clicar no botao abrir a tela some e da inicio a tela 3 "comece pelo começo"
function createquizz(){
    const elementcont= document.querySelector('.container');
    const elementcreat= document.querySelector('.basicQuizz');
    elementcont.classList.add('escondido');
    elementcreat.classList.remove('escondido');
}

function savequizz(){
    const basic = document.querySelector('.basicQuizz');
    const create = document.querySelector('.crieperguntas');
    title = document.querySelector('.tituloquizz').value;
    url = document.querySelector('.imagemquizz').value;
    nquestion = document.querySelector('.qntdPerguntasquizz').value;
    nlevel = document.querySelector('.qntdNiveisquizz').value;
    if (url.startsWith("http://")|| url.startsWith("https://") && nquestion >2 && nlevel >1 && title !== '') {
    basic.classList.add('escondido');
    create.classList.remove('escondido');
    templatePerguntas();
    return true;
} else {
    alert('Informações inválidas, preencha os dados corretamente.');
    
}
    
} 

function templatePerguntas(){
    const main = document.querySelector('.container-perguntas');
    main.innerHTML = '';

    for(let i = 1; i <= nquestion; i++) {
        let template = `
        
        <div class="caixa2">
        <div class="pergunta2">
            <p>Pergunta ${[i]}</p>
            <img src="./assets/Vector.svg" onclick="abaPerguntas()"/>

        </div> <!-- final perg2-->
        </div> <!-- final caixa2-->

        <div class="caixa1 escondido">
        <div class="pergunta1">
        <p>Pergunta ${[i]}</p>
        <input type="text" placeholder="Texto da pergunta" class="textPrimeira">
        <input type="text" placeholder="Cor de fundo da pergunta" class="corPrimeira">
    </div> <!--final div pergunta1-->
    <div class="resposta1">
        <p>Resposta correta</p>
        <input type="text" placeholder="Resposta correta" class="textCorreta">
        <input type="url" placeholder="URL da imagem" class="imgCorreta">
    </div> <!--final resposta1-->
    <div class="incorretas1">
        <p>Respostas incorretas</p>
        <input type="text" placeholder="Resposta incorreta 1" class="textIncorreta">
        <input type="url" placeholder="URL da imagem 1" class="imgIncorreta">
        <input type="text" placeholder="Resposta incorreta 2" class="textIncorreta">
        <input type="url" placeholder="URL da imagem 2" class="imgIncorreta">
        <input type="text" placeholder="Resposta incorreta 3" class="textIncorreta">
        <input type="url" placeholder="URL da imagem 3" class="imgIncorreta">
    </div> <!-- final incorretas1-->

    </div> <!--final caixa1-->
    
        `;

        main.innerHTML += template;

    }
}

function abaPerguntas(){
    const first = document.querySelector('.caixa2');
    const second = document.querySelector('.caixa1');

    first.classList.add('escondido');
    second.classList.remove('escondido');


}


// função para analisar a tela de perguntas e ir pra níveis
function DadosPergunta(){
    const atual = document.querySelector('.crieperguntas');
    const next = document.querySelector('.crieNiveis');
    let textPergunta = document.querySelector('.textPrimeira').value;
    let corPrimeira = document.querySelector('.corPrimeira').value;
    let textCorreta = document.querySelector('.textCorreta').value;
    let url = document.querySelector('.imgCorreta').value;
    let textIncorreto = document.querySelector('.textIncorreta').value;
    let imgIncorreta = document.querySelector('.imgIncorreta').value;

    if (url.startsWith("http://")|| url.startsWith("https://") && imgIncorreta.startsWith("http://")|| imgIncorreta.startsWith("https://") && textPergunta.length >= 20 && textCorreta !== ''){
        
        atual.classList.add('escondido');
        next.classList.remove('escondido');
        return true;
    } else {
        alert('informações inválidas, preencha os dados corretamente.');
    }
    
}



function DadosNiveis(){
    const pagAtual = document.querySelector('.crieNiveis');
    const pagNext = document.querySelector('.finalCriacao');
    let url = document.querySelector('.imgPrimeira').value;

    if (url.startsWith("http://")|| url.startsWith("https://") ){
        pagAtual.classList.add('escondido');
        pagNext.classList.remove('escondido');
        return true;
    } else{
        alert('informações inválidas, preencha os dados corretamente.');
    }
}