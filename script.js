const cartas = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍒', '🍒', '🍍', '🍍'];

cartas.sort(() => 0.5 - Math.random()) //embaralhamento das cartas

let primeiraCarta = null; //guarda o primeiro elemento selecionado
let segundaCarta = null; // guarda o segundo elemento selecionado

let bloquearTabuleiro = false; //bloqueia o tabuleiro para não aparecer as cartas

function virarCarta(cartaClicada){
    if (bloquearTabuleiro === true) return;
    if (cartaClicada === primeiraCarta) return;

    cartaClicada.classList.add('virada');

    if (!primeiraCarta) {
        primeiraCarta = cartaClicada;
        return;
    }

    segundaCarta = cartaClicada;
    checarPar();

}

function checarPar(){
    let match = primeiraCarta.dataset.fruta === segundaCarta.dataset.fruta;

    if (match){
        resetarTabuleiro();
    } else {
        bloquearTabuleiro = true;

        setTimeout(() => {
            primeiraCarta.classList.remove('virada');
            segundaCarta.classList.remove('virada');
            resetarTabuleiro();
        }, 750);
    }
}

function resetarTabuleiro(){
    primeiraCarta = null;
    segundaCarta = null;

    bloquearTabuleiro = false;
}

const tabuleiro = document.querySelector('.tabuleiro');

cartas.forEach((valorCarta) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');

    carta.dataset.fruta = valorCarta;

    carta.innerHTML = `
    <div class ="frente">${valorCarta}</div>
    <div class="tras">?</div>
    `;


    carta.onclick = () => virarCarta(carta);
    tabuleiro.appendChild(carta);
});

function recomecar(){
    const todasCartas = document.querySelectorAll('.carta');
    todasCartas.forEach(carta => carta.classList.remove('virada'));

    resetarTabuleiro();

    setTimeout(() => {
        location.reload();
    }, 500);
}
