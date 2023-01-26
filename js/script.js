
let title;
let url;
let nquestion;
let nlevel;
// ao clicar em algum dos quizz muda pra tela 2
function runquizz(selecionado){

const elementcont= document.querySelector('.container');
const elementpage2= document.querySelector('.pagina2');

// adicionar a classe escondido para montar a tela 2
//elementhearder.classList.add('escondido');(coloquei comentado pois o topo não desparece)
elementcont.classList.add('escondido');
elementpage2.classList.remove('escondido');
}
//ao clicar no botao abrir a tela some e da inicio a tela 3

function createquizz(){

    const elementcont= document.querySelector('.container');
    const elementcreat= document.querySelector('.basicQuizz');
    elementcont.classList.add('escondido');
    elementcreat.classList.remove('escondido');
}
function savequizz(){
// coloca o escondido na tela de criacao e tira da tela de criacao das perguntas
    validquizz();
    const basic = document.querySelector('.basicQuizz');
    const create = document.querySelector('.crieperguntas');

    basic.classList.add('escondido');
    create.classList.remove('escondido');
   }

    function validquizz(){
    title = document.querySelector('.tituloquizz').value;
    url = document.querySelector('.imagemquizz').value;
    nquestion = document.querySelector('.qntdPerguntasquizz').value;
    nlevel = document.querySelector('.qntdNiveisquizz').value;
    
    if(url.startsWith("http://")|| url.startsWith("https://")){
    console.log('url ok')
    }else{
        alert('formato URL invalido');
    }
     if(nquestion >2 && nlevel >1){
      return true;
    }
    else{
        alert('Numero de questões minimas: 3 numero de niveis minimo: 2')
    }  
}


