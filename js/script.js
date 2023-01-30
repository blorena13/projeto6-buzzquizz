
let title;
let url;
let nquestion;
let nlevel;
let allquizz;
let quizzselecionado;

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
    return true;
} else {
    alert('formato URL invalido');
    alert('Numero de questões minimas: 3 numero de niveis minimo: 2');
}
    
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
        alert('informações inválidas');
    }
}