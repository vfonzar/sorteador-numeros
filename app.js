function sortear() {
  let quantidade = parseInt(document.getElementById('quantidade').value);
  let de = parseInt(document.getElementById('de').value);
  let ate = parseInt(document.getElementById('ate').value);
  
  let sorteados = [];
  let numero;

  for (let i = 0; i < quantidade; i++) {
    numero = obterNumeroAleatorio(de, ate);

    while (sorteados.includes(numero)) {
      numero = obterNumeroAleatorio(de, ate);
    }

    sorteados.push(numero);
  }

  let resultadoFormatado = `Números sorteados: ${formatarNumeros(sorteados)}`;
  let resultado = document.getElementById('resultado');
  resultado.innerHTML = `<label class="texto__paragrafo">${resultadoFormatado}</label>`;

  alterarStatusBotao();
  lerTexto(resultadoFormatado); // Chama a função para leitura do resultado
}

function formatarNumeros(numeros) {
  if (numeros.length === 0) return "Nenhum até agora";
  if (numeros.length === 1) return numeros[0];

  let ultimaEntrada = numeros.pop(); // Remove o último número
  return `${numeros.join(", ")} e ${ultimaEntrada}`; // Junta os números com ", " e adiciona " e " no final
}

function obterNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  
}


function alterarStatusBotao() {
  let botaoReiniciar = document.getElementById('btn-reiniciar'); // Botão Reiniciar
  if (botaoReiniciar.classList.contains('container__botao-desabilitado')) {
    botaoReiniciar.classList.remove('container__botao-desabilitado');
    botaoReiniciar.classList.add('container__botao');
  } else {
    botaoReiniciar.classList.remove('container__botao');
    botaoReiniciar.classList.add('container__botao-desabilitado');
  }

  let botaoSortear = document.getElementById('btn-sortear'); // Botão Sortear
  if (botaoSortear.classList.contains('container__botao')) {
    botaoSortear.classList.remove('container__botao');
    botaoSortear.classList.add('container__botao-desabilitado');
  } else {
    botaoSortear.classList.remove('container__botao-desabilitado');
    botaoSortear.classList.add('container__botao');
  }
}

function reiniciar() {
  let mensagem = "Números sorteados: Nenhum até agora";

  document.getElementById('quantidade').value = '';
  document.getElementById('de').value = '';
  document.getElementById('ate').value = '';
  document.getElementById('resultado').innerHTML = `<label class="texto__paragrafo">${mensagem}</label>`;

  alterarStatusBotao();
  lerTexto(mensagem); // Chama a função para leitura do reset
}

// Função para leitura robótica
function lerTexto(texto) {
  let sintese = window.speechSynthesis;
  let fala = new SpeechSynthesisUtterance(texto);

  fala.lang = "pt-BR"; // Configura para português do Brasil
  fala.rate = 1; // Velocidade normal
  fala.pitch = 1; // Tom normal
  fala.volume = 1; // Volume máximo

  sintese.speak(fala);
}