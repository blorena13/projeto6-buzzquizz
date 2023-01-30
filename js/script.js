
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
    nlevel = document.querySelector('.qntdPerguntasquizz').value;
    nquestion=document.querySelector('.qntdNiveisquizz').value;
    url = document.querySelector('.imagemquizz').value;
    console.log(nlevel);
    console.log(nquestion);
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

function createnivel(){

    const nivel = document.querySelector('.container-niveis');
    nivel.innerHTML = '';
    for(let i=2; i<= nlevel; i++){
        
        nivel.innerHTML+= ` 
        <div class="caixa2-pai">
        <div class="caixa2-filho ">
            <p>Nível ${[i]}</p>
           <div class="img-folho" onclick="transitionivel(this)"><img src="./assets/Vector.svg"/></div>
        </div> <!-- final caixa2-filho-->
        </div> <!-- final caixa2-pai-->
        <div class="caixa1-pai ">
            <div class="caixa1-filho escondido ">
                <p>Nível ${[i]}</p>
                <input type="text" placeholder="Título do nível" minlength="10" class="tituloPrimeira">
                <input type="text" placeholder="% de acerto mínima" class="acertoPrimeira">
                <input type="url" placeholder="URL da imagem do nível" class="imgPrimeira">
                <input type="text" placeholder="Descrição do nível" minlength="30" class="descPrimeira">
    
            </div> <!-- caixa1filho-->
    
        </div>
        `

    }
}
function transitionivel(selecionado){

    const transitionf= document.querySelector('caixa1-filho');
   
    if(selecionado !== null){
    transitionf.classList.remove('escondido');
    }
}