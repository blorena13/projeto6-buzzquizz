
// ao clicar em algum dos quizz muda pra tela 2
function runquizz(selecionado){

const elementhearder = document.querySelector('.topo');
const elementcont= document.querySelector('.container');
const elementpage2= document.querySelector('.pagina2');

// adicionar a classe escondido para montar a tela 2
//elementhearder.classList.add('escondido');(coloquei comentado pois o topo não desparece)
elementcont.classList.add('escondido');
elementpage2.classList.remove('escondido');
}
