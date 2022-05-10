window.onload = function() {
    let stage = document.getElementById("stage");
    let ctx = stage.getContext("2d");

    document.addEventListener("keydown", upp);
    document.addEventListener("click", uppMobile);

    let outPontos = document.getElementById("outPontos");
    let setRecord = document.getElementById("setRecord");


    





    // variaveis auxiliares
    var vel = 1;
    var largura = stage.width;
    var altura = stage.height;
    var pontos = 0;


    //variavel que contem as imagens
    let personagem = new Image();
    personagem.src = "./img/personagem.png";

    let cactos = new Image();
    cactos.src = "./img/obstacle.png"

    let fundo = new Image();
    fundo.src = "./img/fundo.png"

    let gameOver = new Image();
    gameOver.src = "./img/gameOver2.png"



    setInterval(game, 100);
    setInterval(exibirJogo, 10);
    setInterval(exibirCactos, 10);
    setInterval(criarFundo, 100);
    setInterval(pontuacao, 160);

    // variáveis de posição do personagem
    var xIniPersonagem = 0;
    var yIniPersonagem = 0;

    var lPersonagem = 108;
    var aPersonagem = 130;

    var pPersonagemX = 45;
    var pPersonagemY = 111;

    var lImgPersonagem = 40;
    var aImgPersonagem = 60;

    var vPersonagemY = 0; // velocidade no eixo y





    // variaveis para gerar cacto
    var xIniCacto1 = 0;
    var xIniCacto2 = 50;
    var xIniCacto3 = 150;
    var xIniCacto4 = 250;

    var yIniCacto1 = 0;
    var yIniCacto2 = 0;
    var yIniCacto3 = 0;
    var yIniCacto4 = 0;

    var lCacto1 = 50;
    var lCacto2 = 50;
    var lCacto3 = 50;
    var lCacto4 = 50;


    var aCact = 80;


    var pCactoX1 = stage.width + 50
    var pCactoX2 = stage.width + 250;
    var pCactoX3 = stage.width + 450;

    var pCactoX4 = stage.width + 600;



    var pCactoY1 = 141;


   
    var lImgCacto = 20;

    var aImgcacto = 30;

    var vCactoX = 0; // velocidade no eixo x



    // variaveis para exibir o fundo
    var xIniFundo1 = 0;  // inicio do fundo 1 no canto superior direito
    var xIniFundo2 = -524; //inicio do fundo 2 no canto superior esquerdo

    var yIniFundo1 = 0;
    var yIniFundo2 = 0;

    var lFundo = 524; //largura
    var aFundo = 175; //altura

    var pFundo1X = 0; // ponto x do fundo 1
    var pFundo2X = 0; // ponto y do fundo 2


    var pFundoY = 0;  // ponto y dos fundos


    var lImgFundo = 524; // largura da imagem
    var aImgFundo = 175; // altura da imagem

    var vFundoX = 0; // velocidade no eixo x


    



    function exibirJogo () {
        verificarPos();
       
        ctx.clearRect(0, 0, stage.width, stage.width);


       
        
        
        //(imagem, xInicioRecorte, yInicioRecorte, larguraRecorte, alturaRecorte, posicaoX, posicaoY, larguraImagem, alturaimagem)

        // fundo
        ctx.drawImage(fundo, xIniFundo1, yIniFundo1, lFundo, aFundo, pFundo1X, pFundoY, lImgFundo, aImgFundo);

        ctx.drawImage(fundo, xIniFundo2, yIniFundo2, lFundo, aFundo, pFundo2X, pFundoY, lImgFundo, aImgFundo);

        //personagem
        ctx.drawImage(personagem, xIniPersonagem, yIniPersonagem, lPersonagem, aPersonagem, pPersonagemX, pPersonagemY, lImgPersonagem, aImgPersonagem);

        // cactos
        ctx.drawImage(cactos, xIniCacto1, yIniCacto1, lCacto1, aCact, pCactoX1, pCactoY1, lImgCacto, aImgcacto);

        ctx.drawImage(cactos, xIniCacto2, yIniCacto2, lCacto2, aCact, pCactoX2, pCactoY1, lImgCacto, aImgcacto);

        ctx.drawImage(cactos, xIniCacto3, yIniCacto3, lCacto3, aCact, pCactoX3, pCactoY1, lImgCacto, aImgcacto);

        ctx.drawImage(cactos, xIniCacto4, yIniCacto4, lCacto4, aCact, pCactoX4, pCactoY1, lImgCacto, aImgcacto);


        //solo 
        ctx.fillStyle = "rgb(105, 67, 32)";
        ctx.fillRect(0, altura - 3, largura, largura);


        if (vel == 0) {
            ctx.drawImage(gameOver, 162, 30);
        }
    }


    function criarFundo () {
        pFundo1X += vFundoX;
        xIniFundo2 += vel;
        
        //se o inicio do fundo 2 no x for menor que a posição 0
        //redefine os valores iniciais e cria-se um novo movimento 
        if (xIniFundo2 >= 0) {
            pFundo1X = 0;
            xIniFundo2 = -524;
        }
        //diminoui para mover pra esquerda
        vFundoX = -vel;
    }

    function game() {
        posPersonagem();
        function posPersonagem() {
            pPersonagemY += vPersonagemY;

            //controla a animação de movimento no eixo x do personagem se a valocidade for igual a 1
            if (vel >= 1) {
                if (xIniPersonagem == lPersonagem  * 7) {
                    xIniPersonagem = 0;
                } else {
                    xIniPersonagem += lPersonagem;
                }
            }
          
            //controla a moiventaçao do personagem no eixo y
            if (pPersonagemY <= 75) {
                
                vPersonagemY = 5 + vel;
                
            } else if (pPersonagemY >= 111) {
                vPersonagemY = 0;
            }
        }   
        if (vel == 0) {
            colisao();
        } 
        
    }

    function verificarPos() {
        if (pPersonagemY + aImgcacto + 10 >= pCactoY1 && pCactoX1 
            + 15 <= pPersonagemX +lImgPersonagem && pCactoX1 > 30) {
            vel = 0;
           // colisao();
        }

        if (pPersonagemY + aImgcacto + 10 >= pCactoY1 && pCactoX2 
            + 15 <= pPersonagemX +lImgPersonagem && pCactoX2 > 30) {
            vel = 0;
            //colisao();
        } 

        if (pPersonagemY + aImgcacto + 10 >= pCactoY1 && pCactoX3
             + 15 <= pPersonagemX +lImgPersonagem && pCactoX3 > 30) {
            vel = 0;
            //colisao();
         }

    }


    function exibirCactos () {
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

        vCactoX = -vel;
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
            vel+= .1;
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




    function upp(event) {
       
        switch (event.keyCode) {
            case 38:
            
            if (pPersonagemY == 111) {
            up();
            vPersonagemY += -5 - vel;
           }
            if (vel == 0) {
                location.reload();
            }
            break;

        default:
            break;
        }
    }


    function uppMobile () {
        if (pPersonagemY == 111) {
            up();
            vPersonagemY += -5 - vel;
        }
        if (vel == 0) {
            location.reload();
        }
    }



    // efeitos sonoros
    
    // if (vel != 0) {
    //     var theme = document.getElementById("themeMusic");
    //     theme.play();
    // }

    function up() {
        let audiokey = document.getElementById("keyUp");
        audiokey.currentTime = 0.62;
        audiokey.play();
    }

    function colisao() {
        if (vel == 0) {
            let audio = document.getElementById("gameOver");
            audio.play();  
            // location.reload();
        }
    }

    function brilho () {
        let audio = document.getElementById("brilho");
            audio.play();
    }
}