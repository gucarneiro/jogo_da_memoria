const cartas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']; //definição das cartas

cartas.sort(() => 0.5 - Math.random()) //embaralhamento das cartas

let cartaAtual = 1; //indica qual carta o jogador deverá clicar

let bloquearTabuleiro = false; //bloqueia o tabuleiro para não aparecer as cartas enquanto um erro acontece

function virarCarta(cartaClicada){//função executada sempre q uma carta é clicada
    if (bloquearTabuleiro || cartaClicada.classList.contains('virada')) return; //se o tabuleiro travado ou carta ja aberta, ignorar o click

    const valorCarta = Number(cartaClicada.dataset.numero);//pega a carta e transforma em número para comparação

     cartaClicada.classList.add('virada')//vira a carta para o jogar ver se esta errada ou certa 
    
    if (valorCarta === cartaAtual){ //verficação: verifica se a carta clicada é a carta esperada (ex. 1)
        cartaAtual++; //caso seja a carta clicada, adicione +1 a carta esperada (ex. 2 = 2 + 1 = carta esperada 3)

        if(cartaAtual>10){//caso chegue ao ultimo número (10), finaliza com "Parabens!"
            setTimeout(() => alert("Parabens!"), 800); 
        }
    } else { //caso a carta selecionada não seja a esperada:
        bloquearTabuleiro = true;//bloqueia o tabuleiro

        setTimeout(() => {
            const todasCartas = document.querySelectorAll('.carta');//seleciona todas as cartas

            todasCartas.forEach(carta => {
                carta.classList.remove('virada');//remove a classe 'virada' e mostra a parte de tras da carta
            });

            cartaAtual = 1; //reseta para primeira carta

            bloquearTabuleiro = false; //debloqueia o tabuleiro
        }, 600); //mostra a carta por 600ms (0.6s)
    }
}

const tabuleiro = document.querySelector('.tabuleiro');//seleciona o tabuleiro pela class 

cartas.forEach((valorCarta) => {//para cada carta embaralhada no array, crimos um elemento visual
    const carta = document.createElement('div');
    carta.classList.add('carta');

    carta.dataset.numero = valorCarta;//guarda o valor da carta dentro do atributo personalizado (dataset)

    carta.innerHTML = `
    <div class ="frente">${valorCarta}</div>
    <div class="tras">?</div>
    `;//define a estrutura da carta, frente -> valorCarta, tras -> '?'

    carta.onclick = () => virarCarta(carta); //ao clicar, indica a função virarCarta
    tabuleiro.appendChild(carta); //adiciona a carta dentro de 'tabuleiro'
});

function recomecar(){ //função recomeçar
    const todasCartas = document.querySelectorAll('.carta'); //seleciona todas as cartas
    todasCartas.forEach(carta => carta.classList.remove('virada')); //remove a class 'virada' 

    setTimeout(() => {
        location.reload();
    }, 500);
}
