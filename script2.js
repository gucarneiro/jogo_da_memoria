const cartas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

cartas.sort(() => 0.5 - Math.random()) //embaralhamento das cartas

let cartaAtual = 1; //guarda o primeiro elemento selecionado

let bloquearTabuleiro = false; //bloqueia o tabuleiro para não aparecer as cartas

function virarCarta(cartaClicada){
    if (bloquearTabuleiro || cartaClicada.classList.contains('virada')) return;

    const valorCarta = Number(cartaClicada.dataset.numero);

     cartaClicada.classList.add('virada')//vira a carta para o jogar ver oq é    
    
    if (valorCarta === cartaAtual){
        cartaAtual++;

        if(cartaAtual>10){
            setTimeout(() => alert("Parabens!"), 800);
        }
    } else {
        bloquearTabuleiro = true;

        setTimeout(() => {
            const todasCartas = document.querySelectorAll('.carta');

            todasCartas.forEach(carta => {
                carta.classList.remove('virada');
            });

            cartaAtual = 1;

            bloquearTabuleiro = false;
        }, 600);
    }
}

const tabuleiro = document.querySelector('.tabuleiro');

cartas.forEach((valorCarta) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');

    carta.dataset.numero = valorCarta;

    carta.innerHTML = `
    <div class ="frente">${valorCarta}</div>
    <div class="tras">?</div>
    `;

    carta.onclick = () => virarCarta(carta);
    tabuleiro.appendChild(carta);
});

