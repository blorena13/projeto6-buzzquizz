
let title;
let url;
let nquestion;

let nlevel;

let contadorderespondida=0;	
let quantidadedequestoes;
let nivel=0;
let iddoquizz;

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
        <div class="esconder " >
        <div class="caixa2 ">
        <div class="pergunta2">
            <p>Pergunta ${[i]}</p>
            <img src="./assets/Vector.svg" onclick="togglePerguntas(this)"/>

        </div> <!-- final perg2-->
        </div> <!-- final caixa2-->
</div>
        <div class="container-opcoes escondido">
        <div class="container-caixa1">
        <div class="caixa1 ">
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
    </div> 
    </div>
        `;

        main.innerHTML += template;

    }
}



function togglePerguntas(clique){
  const selecionado = clique.querySelector('.escondido');
  const first = document.querySelector('.esconder');
  const second = document.querySelector('.container-opcoes');

  

  if (selecionado !== null){
    selecionado.classList.remove("escondido");
  } if (clique === selecionado){
    clique.classList.remove("escondido");
  } else {
    first.classList.add("escondido");
    second.classList.remove("escondido");
  }
  console.log(clique);
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