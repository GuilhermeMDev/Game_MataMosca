//Capturando o tamanho da tela
var altura = 0
var largura = 0
var vidas = 1
var tempo = 13

var criaMosquitoTempo = 1500

//Recuperando o nivel do jogo informado na tela inicial, atraves do windows.location entre as paginas.
var nivel = window.location.search //Ele traz apenas o que vem a direita do ? na url recuperada.
nivel = nivel.replace('?', '')

if (nivel === 'normal') {
    //1500 milisegundos
    criaMosquitoTempo = 1500

} else if (nivel === 'dificil') {
    //1000 mlseg
    criaMosquitoTempo = 1000

} else if (nivel === 'chucknorris') {
    //750 mlseg
    criaMosquitoTempo = 750

}



function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo() //Chamando função

//Criando o cronometro e escrevendo na tela
var cronometro = setInterval(function () {
    tempo -= 1

    if (tempo < 0) { //iniciando o fluxo de vitória e corrigindo o bug do contador negativado.
        clearInterval(cronometro)
        clearInterval(criarMosquito)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)


//Posicionando randomicamente a mosca na tela
function posicaoRandomica() {

    //Remover o mosquito anterior (Caso exista)
    if (document.getElementById('mosquito')) { //O js entende que é true, se for true, ele aplica o .remove()
        document.getElementById('mosquito').remove()

        //Controle dos pontos de vida
        if (vidas > 3) {

            window.location.href = 'fim_de_jogo.html' //forçando o navegador ir para a pagina de gameover, quando o contador de vidas for > 3 (maior que 3)

        } else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
            vidas++

        }
    }
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    //Aqui, evito um bug caso o valor randomica seja x = 0, y = 0. Devido a subtração a cima, o elemento pode aparecer fora da tela.
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    //Adicionando som de fundo do mosquito
    som_mosquito = document.createElement('audio')
    som_mosquito.src = 'sons/Mosquito1.mp3'
    som_mosquito.autoplay = true
    som_mosquito.volume = 0.30

    //Criando o elemento html, neste caso o alvo.    
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()//Chama a função a baixo
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'

    mosquito.onclick = function () {
        som_mosquito = document.createElement('audio') //Ao clicar para removar o mosquito, executa o som de 'esmagado'
        som_mosquito.src = 'sons/esmagado1.mp3'
        som_mosquito.autoplay = true
        this.remove()

    }

    document.body.appendChild(mosquito)

}


//Abaixo selecionamos uma das 3 opções de tamanho do alvo,
//Por decisão de estudos, decidimos usar o switch para a lógica.
function tamanhoAleatorio() {

    var classe = Math.floor(Math.random() * 3)
    console.log(classe)

    switch (classe) {
        case 0:
            return 'mosquito1' // Não usei break porque o return serve tal como.
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}


//Alternando o lado do elemento
function ladoAleatorio() {

    var classe = Math.floor(Math.random() * 2)
    console.log(classe)

    switch (classe) {
        case 0:
            return 'ladoA' // Não usei break porque o return serve tal como.
        case 1:
            return 'ladoB'
    }
}