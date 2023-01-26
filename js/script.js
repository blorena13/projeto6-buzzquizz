
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
// falta a parte da pagina 3 para selecionar e remover o escondido dela para trocar a tela
    elementcont.classList.add('escondido');
}

//
