// let titulo  = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumeroSorteados = [];
let numeroLimite = 100;
let numeroSecreto = GerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
let campo = document.querySelector(tag);
campo.innerHTML = texto;
if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.6; 
    window.speechSynthesis.speak(utterance); 
} else {
    console.log("Web Speech API não suportada neste navegador.");
}
}

function exibirMensagemInicial() {
    exibirTextoNaTela ('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
    
    
}
exibirMensagemInicial();


exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou miserável!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa!';
        let mensagemTentativas = `Você descobriu o número Secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela ('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // remove atributo disabled da linha no HTML
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor');
        } else {
            exibirTextoNaTela ('p',' O número secreto é maior');
        } 
        tentativas++;
        limparCampo();
    }
}
// gera número aleatorio e vê se o número já foi escolhido,, usando o array listaDeNumeroSorteados []
function GerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() *numeroLimite +1);
   let quantidadeDeElementosNalista = listaDeNumeroSorteados.length;

if ( quantidadeDeElementosNalista == numeroLimite) {
    listaDeNumeroSorteados = [];
}

   if (listaDeNumeroSorteados.includes(numeroEscolhido)){ //Se incluir um dos numeros escolhidos "includes"
        return GerarNumeroAleatorio ();
   } else {
    listaDeNumeroSorteados.push(numeroEscolhido); //adiciona item ao final da lista e .pop retira
    console.log(listaDeNumeroSorteados);
        return numeroEscolhido;
   }
    
}
// Função para limpar o campo após uma tentativa
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
//Função que reinicia o jogo após o clique no botão Novo Jogo
function reiniciarJogo() {
    numeroSecreto = GerarNumeroAleatorio()
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute ('disabled', true);
    

    
}