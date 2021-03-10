
// Capturando todos os botoes do documento

var botoes = document.querySelectorAll('#calculadora span');
var operadores = ['+', '-', 'x', '/'];
var pontoAdicionado = false;                          // Verificador se já existe decimal no input. True = já existe False = não existe.

function estadoInicial() {
    var init = document.getElementById('visor').innerHTML = '0';
    pontoAdicionado = false;
}

window.onload = estadoInicial();                      // Chamo a função estadoInicial ao carregar a página, setando um 0 no visor da calculadora.

// Loop para vincular o evento de clique para todos os botões existentes na calculadora, juntamente com todas as funções.
for (var i = 0; i < botoes.length; i++) {
    botoes[i].onclick = function (e) {
        var input = document.querySelector('#visor'); // Selecionando o elemento 'visor' que é meu input.    
        var inputVal = input.innerHTML;               // Captura valor que está no input no momento do clique
        //console.log("inputval " + inputVal);
        var btnVal = this.innerHTML;                  // Capturando o valor do botão clicado, utilizando a palavra 'this'.
        //console.log("btnval " + btnVal);

       
        // Botão Igual
        if (btnVal == '=') {
            var equacao = inputVal;

            // Capturando o último caracter para verificação
            var ultimoChar = equacao[equacao.length - 1];

            // Trocando o caracter x por *
            equacao = equacao.replace(/x/g, '*');

            // Removendo o último char caso seja um operador ou um ponto
            if (ultimoChar == '.' || operadores.indexOf(ultimoChar) > -1) {
                equacao = equacao.replace(/.$/, '');
            }

            // Realizando a função eval, facilitando demais nos cálculos.
            if (equacao) {
                input.innerHTML = eval(equacao);
                pontoAdicionado = false;
            }

        }

        // Botão Clear
        else if (btnVal == 'C') {           
            estadoInicial();            
        } 

    
    /* ------------------------------------------------------------------------------ */

        /* Tratamentos necessários ou Regras de Negócio. 
        
           1ª Regra - Dois operadores não podem ser adicionados consecutivamente. Ex: 2++3
           2ª Regra - A equação não deve começar com um operador, exceto se for o sinal de menos. Ex: /2+3 
        */

        //Verifica se o operador foi clicado 
        else if (operadores.indexOf(btnVal) > -1) {

            // captura o ultimo char
            var ultimoChar = inputVal[inputVal.length - 1];

            // caso seja diferente de 0 e o ultimo char NÃO for um operador então ele concatena normalmente.
            if (inputVal != '0' && operadores.indexOf(ultimoChar) == -1) {
                input.innerHTML += btnVal;
            }
        
            // caso valor atual seja igual a 0 e o botão clicado seja o operador menos, então ele se torna somente o sinal de menos
            else if (inputVal == '0' && btnVal == '-') {
                input.innerHTML = btnVal;
            }
            // caso o último char seja um operador e o botão clicado seja um operador também, então ele troca o sinal antigo pelo novo operador.
            if (operadores.indexOf(ultimoChar) > -1 && inputVal.length > 1) {
                input.innerHTML = inputVal.replace(/.$/, btnVal);
            }

            pontoAdicionado = false;
        }

        /* 3ª Regra - Não pode haver mais do que um ponto na equação. Ex: 2..2 ou 2.2.2 */

        // Verificação de duplo ponto
        else if (btnVal == '.') {
            if (pontoAdicionado == false) {     // Se no momento em que o '.' foi clicado o verificador for igual a false é pq ainda não existe decimal na equação.
                input.innerHTML += btnVal;
                pontoAdicionado = true;         // Adiciono o true para o verificador, assim eu bloqueio a adição de novos pontos decimais na equação.
            }
        }

        /* 4ª Regra - O input tem um tamanho máximo de números que podem ser inseridos. */
        // Tamanho máximo do input
        else if(inputVal.length >= 25){            
            input.innerHTML = inputVal;
            alert("Tamanho máximo atingido!");
        }

        // Caso botão clicado tenha sido qualquer outro valor, será adicionado ao input. 
        else {
            if (inputVal == '0') {              // Uma breve verificação caso o valor no input seja 0. Removendo ele assim que outro botão for clicado, para não ficar 098 por exemplo e sim 98.
                input.innerHTML = btnVal;
            } else {
                input.innerHTML += btnVal;
            }
        }

    }   // Fim do evento de clique
}   // Fim do laço for