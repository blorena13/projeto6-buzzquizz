
let title;
let url;
let nquestion;
let nlevel;

let contadorderespondida=0;	
let quantidadedequestoes;
let nivel=0;
let iddoquizz;
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

//funçao para pegar o quizz por id
function pegarquizzporid(id){

    const axiosget = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/1`);
    axiosget.then(deucerto);
    axiosget.catch(deuruim);
}

function deucerto(objeto){
    console.log('deubom');
    console.log(objeto);
    apareceaquestão(objeto.data)
}
function deuruim(erro){
    console.log(erro);
    console.log('demuitoruimgata')
}
//ao clicar voltar para a tela 1
function backtohome(){
    const elementcont= document.querySelector('.container');
    const elementpage2= document.querySelector('.pagina2');

    elementpage2.classList.add('escondido')
    elementcont.classList.remove('escondido')
}

//faz aparecer a questão
function apareceaquestão(questaodoquizz){
    const pagina2=document.querySelector('.pagina2')
    let pergs="";
    nivel=questaodoquizz.levels;
    iddoquizz=questaodoquizz.id;
    console.log(questaodoquizz.questions);
    quantidadedequestoes=questaodoquizz.questions.length;

    questaodoquizz.questions.forEach((element,index) => {
        pergs= pergs+perguntaeresposta(element,index)
    }); 

    pagina2.innerHTML=`
    <div class="titulodoquizz">
      <img class="quizzimg"src="${questaodoquizz.image}">
      <p>"${questaodoquizz.title}</p>
    <img class="quizzimgnomobile"src="${questaodoquizz.image}">
    </div>
    <div class="perguntas">
    ${pergs}
    
    <div class="resultadoevoltar ">
    </div>
    </div>
    
    `
}




function perguntaeresposta(element,index){
    function aleatorio() {
    return Math.random() - 0.5;
  }
   element.answers.sort(aleatorio) ;
   let imgetxtresp="";
   element.answers.forEach((answer) => {
   imgetxtresp= imgetxtresp+ construirresposta(answer,index)
}); 

return `

    <div class="pergunta ${index}">
        <div class="textodapergunta" style="background-color: ${element.color}">
            <p>${element.title}</p>
        </div>
        <div class="respostas">
          ${imgetxtresp}
        </div>
    </div>

`
}

function construirresposta(answer,index){
    let trueorfalse='falsa'
    if(answer.isCorrectAnswer){
        trueorfalse='correta'
    }
return `                
         <div class="imgresposta ${trueorfalse}"  onclick="respostaselecionada(this)">
           <img src="${answer.image}">
           <p class="">${answer.text}</p>
          </div>`
}


pegarquizzporid()

//função para  marcar como certa
function respostaselecionada(selecionada){
   
   const divrespostas=selecionada.parentNode;
if(divrespostas.classList.contains('jáfoirespondido')){
    return
}
   console.log(selecionada);
   if(selecionada.classList.contains('correta')){
   selecionada.classList.add('certa');
    contadorderespondida+=1;
}else{
    selecionada.classList.add('erou')
   }

   divrespostas.classList.add('jáfoirespondido')
const repstransparentes=divrespostas.querySelectorAll('.imgresposta')
   
  for (let i = 0; i < repstransparentes.length; i++) {
      
    if (selecionada !== repstransparentes[i]) {
      repstransparentes[i].classList.add("naoselecionada");
    }
  }
  exibefinaldoquizz()
}

function exibefinaldoquizz(){
    console.log(contadorderespondida);
    console.log(quantidadedequestoes)
let resultadoemporcentagem=((contadorderespondida)/quantidadedequestoes)*100;
console.log(resultadoemporcentagem);
console.log(nivel)
const finaldoquizz=document.querySelector('.resultadoevoltar');

for(let i=0;i<nivel.length;i++){
    if(nivel[i].minValue<=resultadoemporcentagem){
       finaldoquizz.innerHTML=`
<div class="resultado ">
  <div class="porcentagem">
   <p>${resultadoemporcentagem}% de acerto: ${nivel[i].title}</p>
  </div>
 <div class="resultadotxt">
   <div>
     <img src="${nivel[i].image}">
   </div>
   <div>
     <p> ${nivel[i].text}</p>
   </div>
 </div>
</div>
<div class='finaall'>
<button class="reiniciaquizz" onclick="reinicia()">Reiniciar Quizz</button>
</div>
<p class="voltaprahome" onclick="backtohome()">Voltar para Home</p>

` 
    }
}

}
function reinicia(){
    const iniciodoquizz= document.querySelector('.titulodoquizz');
    iniciodoquizz.scrollIntoView({ behavior: "smooth" }); 
    contadorderespondida=0;
    pegarquizzporid(iddoquizz)
}


function createquizz(){

    const elementcont= document.querySelector('.container');
    const elementcreat= document.querySelector('.basicQuizz');
    elementcont.classList.add('escondido');
    elementcreat.classList.remove('escondido');
}

// função para analisar a tela dos dados e ir para as perguntas "crie suas perguntas"
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

    if (url.startsWith("http://")|| url.startsWith("https://") && imgIncorreta.startsWith("http://")|| imgIncorreta.startsWith("https://") && textPergunta.length >= 20 && corPrimeira.length <= 6 && textCorreta !== ''){
        atual.classList.add('escondido');
        next.classList.remove('escondido');
        return true;
    } else {
        alert('informações inválidas');
    }
}
