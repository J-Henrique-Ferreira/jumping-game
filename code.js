//                        __   __
//                       |(ª) (*)|
//                       |   #   | 
//                       | '¨¨¨' |
//                        ¨¨¨¨¨¨¨                           
/*---------- Coded by @joaof6418 instagram ----------*/

window.onload = function() {
    let stage = document.getElementById("stage");
    let ctx = stage.getContext("2d");

    document.addEventListener("keydown", up);
    document.addEventListener("click", upMobile);

    let outPontos = document.getElementById("outPontos");
    let setRecord = document.getElementById("setRecord");



    // variaveis auxiliares
    var vel = 1;
    var largura = stage.width;
    var altura = stage.height;
    var pontos = 0;
    var ctrlColisao = 0;

    //variavel que contem as imagens
    let personagem = new Image();
    personagem.src = "./img/personagem.png";

    let cactos = new Image();
    cactos.src = "./img/obstacle.png"

    let fundo = new Image();
    fundo.src = "./img/fundo.png"

    let gameOver = new Image();
    gameOver.src = "./img/gameOver2.png"



    
    setInterval(exibirJogo, 50);
    setInterval(valorCactos, 0);
    setInterval(game, 50);
    setInterval(criarFundo, 250);
    setInterval(pontuacao, 120);
    setInterval(bip, 250)
    setInterval(themeMusic, 1000)
    // variáveis de posição do personagem
    var xIniPersonagem = 0; // ponto de inicio detro da imagem original
    var yIniPersonagem = 0;

    var lPersonagem = 108; //largura docorte na imagem original
    var aPersonagem = 130; // altura .......

    var pPersonagemX = 45;  // ponto x que que personagem mé exibido no stage
    var pPersonagemY = 111; // ponto y que pue persogem é exibido no stage

    var lImgPersonagem = 40; // largura de exibicao da imagem
    var aImgPersonagem = 60; // altura

    var vPersonagemY = 0; // velocidade no eixo y





    // variaveis para gerar cacto
    var xIniCacto1 = 0; //ponto x de inicio do cacto dentro da imagem original
    var xIniCacto2 = 100;
    var xIniCacto3 = 150;
    var xIniCacto4 = 250;

    var yIniCacto1 = 0; //ponto x de inicio do cacto dentro da imagem original
    var yIniCacto2 = 0;
    var yIniCacto3 = 0;
    var yIniCacto4 = 0;

    var lCacto1 = 50; //largura do corte na imagem original
    var lCacto2 = 50;
    var lCacto3 = 50;
    var lCacto4 = 50;


    var aCact = 80; //altura do corte na imagem original

    //posiçao de cada cacto no mapa
    var pCactoX1 = stage.width + 40;
    var pCactoX2 = stage.width + 240;
    var pCactoX3 = stage.width + 480;
    var pCactoX4 = stage.width + 560;



    var pCactoY1 = 141; // ponto y em que o cacto é exibido


   
    var lImgCacto = 20; // largura do cacto

    var aImgcacto = 30; // altura do cacto

    var vCactoX = 0; // velocidade no eixo x



    // variaveis para exibir o fundo
    var xIniFundo1 = 0;  // inicio do fundo 1 no canto superior direito
    var xIniFundo2 = -524; //inicio do fundo 2 no canto superior esquerdo

    var yIniFundo1 = 0;
    var yIniFundo2 = 0;

    var lFundo = 524; //largura do corte
    var aFundo = 175; //altura do corte

    var pFundo1X = 0; // ponto x do fundo 1
    var pFundo2X = 0; // ponto y do fundo 2


    var pFundoY = 0;  // ponto y dos fundos


    var lImgFundo = 524; // largura da imagem
    var aImgFundo = 175; // altura da imagem

    var vFundoX = 0; // velocidade no eixo x


    



    function exibirJogo () {
        verificarPos();
       
        // "apaga" o stage
        ctx.clearRect(0, 0, stage.width, stage.width);


       
        
        
        //(imagem, xInicioRecorte, yInicioRecorte, larguraRecorte, alturaRecorte, posicaoX, posicaoY, larguraImagem, alturaimagem)



        // exibe o fundo
        ctx.drawImage(fundo, xIniFundo1, yIniFundo1, lFundo, aFundo, pFundo1X, pFundoY, lImgFundo, aImgFundo);

        ctx.drawImage(fundo, xIniFundo2, yIniFundo2, lFundo, aFundo, pFundo2X, pFundoY, lImgFundo, aImgFundo);




        //exibe o personagem
        ctx.drawImage(personagem, xIniPersonagem, yIniPersonagem, lPersonagem, aPersonagem, pPersonagemX, pPersonagemY, lImgPersonagem, aImgPersonagem);




        //exibe cactos os cactos
        ctx.drawImage(cactos, xIniCacto1, yIniCacto1, lCacto1, aCact, pCactoX1, pCactoY1, lImgCacto, aImgcacto);

        ctx.drawImage(cactos, xIniCacto2, yIniCacto2, lCacto2, aCact, pCactoX2, pCactoY1, lImgCacto, aImgcacto);

        ctx.drawImage(cactos, xIniCacto3, yIniCacto3, lCacto3, aCact, pCactoX3, pCactoY1, lImgCacto, aImgcacto);

        ctx.drawImage(cactos, xIniCacto4, yIniCacto4, lCacto4, aCact, pCactoX4, pCactoY1, lImgCacto, aImgcacto);






        //cria um solo (uma linha de 3 px )
        // ctx.fillRect(x, y, largura, altura);
        ctx.fillStyle = "#a07f3d";
        ctx.fillRect(0, altura - 3, largura, 3);




        
        //gameOver
        // ctx.drawImage(imagem, x, y)
        if (vel == 0) {
            ctx.drawImage(gameOver, 162, 30);
            colisao();
        } 
    }


    function criarFundo () {
        pFundo1X += vFundoX;
        xIniFundo2 += vel * 2;
        
        //se o inicio do fundo 2 no x for menor que a posição 0
        //redefinen-se os valores iniciais e cria-se um novo movimento 
        if (xIniFundo2 >= 0) {
            pFundo1X = 0;
            xIniFundo2 = -524;
        }
        //diminou para mover pra esquerda
        vFundoX = -vel * 2;
    }

    function game() {
        posPersonagem();
        function posPersonagem() {
            pPersonagemY += vPersonagemY;

            //controla a animação de movimento no eixo x do personagem se a valocidade for igual a 1
            if (vel >= 1 && pPersonagemY >= 111) {
                if (xIniPersonagem == lPersonagem  * 7) {
                    xIniPersonagem = 0;
                } else {
                    xIniPersonagem += lPersonagem;
                }
            }
          
            //controla a moiventaçao do personagem no eixo y
            if (pPersonagemY <= 60 ) {
                
                vPersonagemY = 7;
                
            } else if (pPersonagemY >= 111) {
                vPersonagemY = 0;
            }
        }   
    }

    function verificarPos() {
        // se posicao y do personagem(111) + (altura da imagem do personagem(40) - 10) >= posicao y do cacto && posicao x cacto  + (valor que põe as duas imagens em contato) <= posicao x do persoanagem + largura do personagem && ponto x do personagem > 30


        if (pPersonagemY + (aImgPersonagem -10) >= pCactoY1 && pCactoX1 
            + 15 <= pPersonagemX +lImgPersonagem && pCactoX1 > 35) {
            vel = 0;
           // colisao();
        }

        if (pPersonagemY + (aImgPersonagem -10)>= pCactoY1 && pCactoX2 
            + 15 <= pPersonagemX +lImgPersonagem && pCactoX2 > 35) {
            vel = 0;
            //colisao();
        } 

        if (pPersonagemY + (aImgPersonagem -10) >= pCactoY1 && pCactoX3
            + 15 <= pPersonagemX +lImgPersonagem && pCactoX3 > 35) {
            vel = 0;
            //colisao();
         }

         if (pPersonagemY + (aImgPersonagem -10) >= pCactoY1 && pCactoX4
            + 15 <= pPersonagemX +lImgPersonagem && pCactoX4 > 35) {
            vel = 0;
            //colisao();
         }

    }


    function valorCactos () {
        pCactoX1 += vCactoX;
        pCactoX2 += vCactoX;
        pCactoX3 += vCactoX;

        // se a posição do cacto no x for menor que 0
        // muda o valor dele com acrécimo para gerar uma distância
        // aleatória entre cada cacto
        if (pCactoX1 + lCacto1 < 0 ) {
            pCactoX1 = stage.width;
            xIniCacto1 = gerarCactos();

        }

        if (pCactoX2 + lCacto2 < 0 ) {
            pCactoX2 = stage.width;
            xIniCacto2 = gerarCactos();
        }

        if (pCactoX3 + lCacto3 < 0 ) {
            pCactoX3 = stage.width;
            xIniCacto3 = gerarCactos();
        }

        if (pCactoX4 + lCacto4 < 0 ) {
            pCactoX4 = stage.width;
            xIniCacto4 = gerarCactos();

        }

        vCactoX = -vel * 0.5;
    }



    // function gerarNumeros () {
    //     var  numero = Math.floor(Math.random()*9);
    //     // numero += numero * 100 * 30 + Math.floor(Math.random())*100 * 20;

    //     numero = 524*2 / numero;

    //     // if (pCactoX2 - pCactoX1 > 190) {
    //     //     pCactoX2 = 170
    //     // }
    //     // console.log(numero)
    //     return numero;


    // }

    function gerarCactos () {
        var cacto = Math.floor(Math.random() * 5) * 50;
        return cacto;
    }


    

    function pontuacao () {
        
        if (vel >= 1) {
            pontos++;
        }

        if (pontos%100 == 0) {
            vel+= .05;
            brilho();
        }

        if (localStorage.getItem("record")) {
            var aux = ".";

            var record = localStorage.getItem("record");
            if (pontos > record.length) {
                var record = localStorage.getItem("record") + aux;
                localStorage.setItem("record", record);
            }
        } else {
            var record = ".";
            localStorage.setItem("record", record);
        }

        setRecord.innerHTML =  record.length;
        outPontos.innerHTML = pontos;

    }



    //quando o evento keyDonw o ocorrer
    function up(event) {
       //caso keyDown foi a tecla up
        switch (event.keyCode) {
            case 38:
            
            if (pPersonagemY == 111) {
            upSound();
            vPersonagemY += -7;
           }
            if (vel == 0) {
                vel = 1;
                vPersonagemY = 0;
                pCactoX1 = stage.width + 40 + (( vel * 15) * 2);
                pCactoX2 = stage.width + 240 + (( vel * 15) * 2);
                pCactoX3 = stage.width + 450 + (( vel * 15) * 2);
                pCactoX4 = stage.width + 560 + (( vel * 15) * 2);
                ctrlColisao = 0
                pontos = 0

            }
            break;

        default:
            break;
        }
    }


    function upMobile () {
        if (pPersonagemY == 111) {
            upSound();
            vPersonagemY += -7;
        }
        if (vel == 0) {
            vel = 1;
            vPersonagemY = 0;
            pCactoX1 = stage.width + 40;
            pCactoX2 = stage.width + 240;
            pCactoX3 = stage.width + 450;
            pCactoX4 = stage.width + 560;
            ctrlColisao = 0
            pontos = 0
        }
    }



    // efeitos sonoros
    
    function themeMusic() {
        var theme = document.getElementById("themeMusic");
        theme.play();
    }

    function upSound() {
        let audio = document.getElementById("keyUp");
        audio.currentTime = 0.72;
        audio.play();
    }

    function colisao() {
        if (ctrlColisao == 0) {
            let audio = document.getElementById("gameOver");
            audio.currentTime = .24;
            audio.play();  
            ctrlColisao = 1;
        }
    }

    function brilho () {
        let audio = document.getElementById("brilho");
        audio.play();
    }


    function bip () {
        if (vel >= 1) {
            let audio = document.getElementById("bip");
            audio.currentTime = 0.17;
            audio.play()  
        }
    }
}