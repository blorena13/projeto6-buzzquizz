
// ao clicar em algum dos quizz muda pra tela 2
function runquizz(selecionado){

const elementhearder = document.querySelector('.topo');
const elementcont= document.querySelector('.container');

// adicionar a classe escondido para montar a tela 2
elementhearder.classList.add('escondido');
elementcont.classList.add('escondido');

}
